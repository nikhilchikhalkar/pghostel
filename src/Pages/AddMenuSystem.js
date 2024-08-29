import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AddMenuSystem = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [menuItems, setMenuItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [deletedCategories, setDeletedCategories] = useState([]);
  const [deletedSubcategories, setDeletedSubcategories] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);

  // Fetch data on initial load
  useEffect(() => {
    axios.get('/api/menu')
      .then(response => {
        const apiData = response.data;
        processData(apiData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const processData = (apiData) => {
    const categories = [];
    const subcategories = {};
    const menuItems = {};

    apiData.forEach(item => {
      const { id, category, subcategory, name, description, price } = item;

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

      menuItems[subcategory].push({ id, name, description, price });
    });

    setCategories(categories);
    setSubcategories(subcategories);
    setMenuItems(menuItems);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSubcategories({ ...subcategories, [newCategory]: [] });
    }
  };

  const handleAddSubcategory = () => {
    const newSubcategory = prompt("Enter new subcategory name:");
    if (selectedCategory && newSubcategory && !subcategories[selectedCategory].includes(newSubcategory)) {
      setSubcategories({
        ...subcategories,
        [selectedCategory]: [...subcategories[selectedCategory], newSubcategory],
      });
    }
  };

  const handleOpenDialog = (item = null) => {
    setCurrentItem(item);
    setIsEdit(!!item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCurrentItem(null);
    setIsDialogOpen(false);
  };

  const handleSaveItem = () => {
    if (currentItem) {
      const updatedItems = [...(menuItems[selectedSubcategory] || [])];
      if (isEdit) {
        const index = updatedItems.findIndex(item => item.name === currentItem.name);
        updatedItems[index] = currentItem;
      } else {
        updatedItems.push(currentItem);
      }
      setMenuItems({
        ...menuItems,
        [selectedSubcategory]: updatedItems
      });
    }
    handleCloseDialog();
  };

  const handleDeleteItem = (item) => {
    const updatedItems = menuItems[selectedSubcategory].filter(i => i.name !== item.name);
    setMenuItems({
      ...menuItems,
      [selectedSubcategory]: updatedItems
    });
    setDeletedItems([...deletedItems, item]);
  };

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter(cat => cat !== category));
    setDeletedCategories([...deletedCategories, category]);
    delete subcategories[category];
  };

  const handleDeleteSubcategory = (subcategory) => {
    setSubcategories({
      ...subcategories,
      [selectedCategory]: subcategories[selectedCategory].filter(sub => sub !== subcategory)
    });
    setDeletedSubcategories([...deletedSubcategories, subcategory]);
    delete menuItems[subcategory];
  };

  const handleSaveAllChanges = () => {
    const updatedMenu = {
      categories,
      subcategories,
      menuItems,
      deletedCategories,
      deletedSubcategories,
      deletedItems,
    };
    console.log("save all changes ",updatedMenu);
    

    axios.put('/api/menu', updatedMenu)
      .then(() => {
        console.log('Menu updated successfully');
        // Reset the deleted items after successful update
        setDeletedCategories([]);
        setDeletedSubcategories([]);
        setDeletedItems([]);
      })
      .catch(error => {
        console.error('Error updating menu:', error);
      });
  };

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
                className={`cursor-pointer flex justify-between p-2 rounded ${selectedCategory === category ? 'bg-green-300' : 'hover:bg-green-100'}`}
              >
                <span>
                {category}
                </span>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteCategory(category)}
                >
                  <DeleteIcon/>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleAddCategory} className="bg-blue-500 text-white mt-2 w-full py-2 rounded">
            Add Category
          </button>
        </div>

        {/* Sidebar for Subcategories */}
        <div className={`col-span-12 md:col-span-2 ${!selectedCategory && 'hidden'}`}>
          <h6 className="text-lg">Subcategories</h6>
          <ul className="space-y-2">
            {subcategories[selectedCategory]?.map((subcategory, index) => (
              <li
                key={index}
                onClick={() => handleSubcategoryClick(subcategory)}
                className={`cursor-pointer flex justify-between p-2 rounded ${selectedSubcategory === subcategory ? 'bg-blue-400' : 'hover:bg-blue-100'}`}
              >
                <span >
                {subcategory}
                </span>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteSubcategory(subcategory)}
                >
                  <DeleteIcon/>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleAddSubcategory} className="bg-blue-500 text-white mt-2 w-full py-2 rounded">
            Add Subcategory
          </button>
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
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(menuItems[selectedSubcategory] || []).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">{item.description}</td>
                      <td className="border px-4 py-2">₹{item.price}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <EditIcon/>
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteItem(item)}
                        >
                          <DeleteIcon/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Item Button */}
            {selectedSubcategory && (
              <div className="mt-4 text-right">
                <button onClick={() => handleOpenDialog()} className="bg-green-500 text-white py-2 px-4 rounded">
                  Add Menu Item
                </button>
              </div>
            )}
          </div>

          {/* Save All Changes Button */}
          <div className="mt-4 text-right">
            <button onClick={handleSaveAllChanges} className="bg-green-600 text-white py-2 px-4 rounded">
              Save All Changes
            </button>
          </div>
        </div>
      </div>

      {/* Dialog for Adding/Editing Items */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h6 className="text-lg mb-4">{isEdit ? 'Edit' : 'Add'} Menu Item</h6>
            <input
              type="text"
              placeholder="Name"
              value={currentItem?.name || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={currentItem?.description || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={currentItem?.price || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex justify-end">
              <button onClick={handleSaveItem} className="bg-green-500 text-white py-2 px-4 rounded mr-2">
                {isEdit ? 'Update' : 'Save'}
              </button>
              <button onClick={handleCloseDialog} className="bg-gray-500 text-white py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMenuSystem;
