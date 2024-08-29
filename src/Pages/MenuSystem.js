import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const MenuSystem = () => {
  // const [categories, setCategories] = useState([]);
  // const [subcategories, setSubcategories] = useState({});
  // const [menuItems, setMenuItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const categories = ['Vegetarian', 'Non-Vegetarian', 'Drinks'];

  const subcategories = {
    'Vegetarian': ['Breakfast', 'Starter', 'Main Course'],
    'Non-Vegetarian': ['Breakfast', 'Starter', 'Main Course'],
    'Drinks': ['Soft Drinks', 'Alcoholic Drinks']
  };

  const menuItems = {
    'Breakfast': [
      { name: 'Idli', price: 50 },
      { name: 'Poha', price: 40 },
      { name: 'Upma', price: 45 }
    ],
    'Starter': [
      { name: 'Paneer Tikka', price: 150 },
      { name: 'Chicken Tikka', price: 180 },
      { name: 'Spring Rolls', price: 120 }
    ],
    'Main Course': [
      { name: 'Biryani', price: 200 },
      { name: 'Pasta', price: 160 },
      { name: 'Dal Tadka', price: 130 }
    ],
    'Soft Drinks': [
      { name: 'Coke', price: 30 },
      { name: 'Pepsi', price: 30 },
      { name: 'Sprite', price: 30 }
    ],
    'Alcoholic Drinks': [
      { name: 'Beer', price: 250 },
      { name: 'Whiskey', price: 500 },
      { name: 'Vodka', price: 400 }
    ]
  };

  useEffect(() => {
    // Fetch data from API
    axios.get('/api/menu')
      .then(response => {
        const apiData = response.data;

        // Process the API data into categories, subcategories, and menuItems
        const categories = [];
        const subcategories = {};
        const menuItems = {};

        apiData.forEach(item => {
          const { category, subcategory, name, description, price } = item;

          if (!categories.includes(category)) {
            categories.push(category);
            subcategories[category] = [];
          }

          if (!subcategories[category].includes(subcategory)) {
            subcategories[category].push(subcategory);
          }

          if (!menuItems[subcategory]) {
            menuItems[subcategory] = [];
          }

          menuItems[subcategory].push({ name, description, price });
        });

        // setCategories(categories);
        // setSubcategories(subcategories);
        // setMenuItems(menuItems);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    if (category) {
      const itemsToShow = Object.keys(subcategories[category] || {}).flatMap(subcat => menuItems[subcategories[category][subcat]] || []);
      setFilteredItems(itemsToShow);
    } else {
      setFilteredItems(Object.values(menuItems).flat());
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setFilteredItems(menuItems[subcategory] || []);
  };

  const handleQuantityChange = (item, delta) => {
    const currentQuantity = selectedItems[item.name]?.quantity || 0;
    const newQuantity = Math.max(currentQuantity + delta, 0);

    setSelectedItems(prevItems => ({
      ...prevItems,
      [item.name]: {
        category: selectedCategory,
        subcategory: selectedSubcategory,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: newQuantity,
        total: newQuantity * item.price
      }
    }));
  };

  const calculateGrandTotal = () => {
    return Object.values(selectedItems).reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    const grandTotal = calculateGrandTotal();
    const taxRate = 0.05; // Example: 5% tax
    return grandTotal * taxRate;
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const hasSelectedItems = Object.values(selectedItems).some(item => item.quantity > 0);

  return (
    <div className="p-4">
      <h5 className="text-center text-2xl mb-4">Menu Management System</h5>
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar for Categories */}
        <div className="col-span-12 md:col-span-2">
          <h6 className="text-lg">Categories</h6>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer p-2 rounded ${selectedCategory === category ? 'bg-green-300' : 'hover:bg-green-100'}`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar for Subcategories */}
        <div className={`col-span-12 md:col-span-2 ${selectedCategory === "" ? 'hidden' : 'block'}`}>
          <h6 className="text-lg">Subcategories</h6>
          <ul className="space-y-2">
            {subcategories[selectedCategory]?.map((subcategory, index) => (
              <li
                key={index}
                onClick={() => handleSubcategoryClick(subcategory)}
                className={`cursor-pointer p-2 rounded ${selectedSubcategory === subcategory ? 'bg-blue-400' : 'hover:bg-blue-100'}`}
              >
                {subcategory}
              </li>
            ))}
          </ul>
        </div>

        {/* Display Menu Items */}
        <div className="col-span-12 md:col-span-8">
          <div className="p-4 bg-white rounded shadow">
            <h6 className="text-lg mb-4">
              Items {selectedCategory && `in ${selectedCategory}`} {selectedSubcategory && `- ${selectedSubcategory}`}
            </h6>
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedCategory || selectedSubcategory ? filteredItems : Object.values(menuItems).flat()).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">₹{item.price}</td>
                      <td className="border px-4 py-2 flex items-center">
                        <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleQuantityChange(item, -1)}>-</button>
                        <span className="px-4">{selectedItems[item.name]?.quantity || 0}</span>
                        <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => handleQuantityChange(item, 1)}>+</button>
                      </td>
                      <td className="border px-4 py-2">₹{selectedItems[item.name]?.total || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Display Grand Totals */}
            {hasSelectedItems && (
              <div className="mt-4 text-right">
                <h6 className="text-xl">Grand Total: ₹{calculateGrandTotal()}</h6>
                <h6 className="text-xl">Tax (5%): ₹{calculateTax().toFixed(2)}</h6>
                <h6 className="text-xl text-blue-600">Total with Taxes: ₹{(calculateGrandTotal() + calculateTax()).toFixed(2)}</h6>
              </div>
            )}

            {/* Payment and See Items Button */}
            {hasSelectedItems && (
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={openDialog}>Review & pay</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog for showing selected items */}
      {isDialogOpen && (
        // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        //   <div className="bg-white p-4 rounded shadow-lg w-96">
        //     <div className="text-right mt-4">
        //       <button className="p-1 bg-red-500 text-white rounded" onClick={closeDialog}><CloseIcon/> </button>
        //     </div>
        //     <h6 className="text-lg mb-4">Selected Items</h6>
        //     <ul className="space-y-2">
        //       {Object.entries(selectedItems).map(([name, item]) => (
        //         <li key={name} className="flex justify-between">
        //           <span> {item.name} ({item.description})x{item.quantity}</span>
        //           <span>₹{item.total}</span>
        //         </li>
        //       ))}
        //     </ul>
        //     <div className="text-right mt-4">
        //       <button className="px-4 py-2 bg-blue-500 text-white rounded">Proceed to Payment</button>
        //     </div>
        //   </div>
        // </div>

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="bg-white p-4 rounded shadow-lg w-96">
    <div className="text-right mt-4">
      <button className="p-1 bg-red-500 text-white rounded" onClick={closeDialog}>
        <CloseIcon />
      </button>
    </div>
    <h6 className="text-lg mb-4">Selected Items</h6>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Item</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Object.entries(selectedItems).map(([name, item]) => (
            <tr key={name}>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                {item.name}
                 {/* ({item.description}) */}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 ">
                 <span>x</span>  <span>{item.quantity}</span></td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasSelectedItems && (
              <div className="mt-4 text-right">
                <h6 className="text-xl">Grand Total: ₹{calculateGrandTotal()}</h6>
                <h6 className="text-xl">Tax (5%): ₹{calculateTax().toFixed(2)}</h6>
                <h6 className="text-xl text-blue-600">Total with Taxes: ₹{(calculateGrandTotal() + calculateTax()).toFixed(2)}</h6>
              </div>
            )}
    </div>
    <div className="text-right mt-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Proceed to Payment</button>
    </div>
  </div>
</div>





      )}
    </div>
  );
};

export default MenuSystem;
