import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const InventoryManagement = () => {
  const imsTypes = ['ALL STORES', 'SD: STORE DATA', 'KD: KITCHEN DATA', 'CD: CHANGING ROOMS DATA'];
  const statusOptions = ['Normal', 'Less', 'Excess'];

  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('ALL STORES');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    imstype: '',
    id: '',
    name: '',
    unitPrice: '',
    quantity: '',
    minQuantity: '',
    status: '',
    supplierName: '',
    supplierMobile: ''
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch('/api/items');
        // const data = await response.json();
        const data = [
          { imstype: 'SD: STORE DATA', id: 'Towe0001', name: 'Towels Big Size', unitPrice: '5.00', quantity: '100', minQuantity: '20', status: 'Normal', supplierName: 'ABC Textiles', supplierMobile: '+1234567890' },
          { imstype: 'CD: CHANGING ROOMS DATA', id: 'Towl0002', name: 'Towels Small Size', unitPrice: '3.00', quantity: '150', minQuantity: '30', status: 'Excess', supplierName: 'XYZ Suppliers', supplierMobile: '+0987654321' },
          { imstype: 'SD: STORE DATA', id: 'Towl0003', name: 'Towels Medium Size', unitPrice: '4.00', quantity: '80', minQuantity: '15', status: 'Less', supplierName: 'LMN Distributors', supplierMobile: '+1122334455' },
        ];
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // await fetch(`/api/items/${itemToDelete}`, { method: 'DELETE', });

      // localy delete 
      const updatedItems = items.filter(item => item.id !== itemToDelete);
      setItems(updatedItems);
      setOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setItemToDelete(null);
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditedItem(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value
    });
  };

  const handleUpdateClick = async () => {
    try {
      await fetch(`/api/items/${editingItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedItem),
      });

      // localy update
      const updatedItems = items.map(item =>
        item.id === editingItemId ? editedItem : item
      );
      setItems(updatedItems);
      setEditingItemId(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const handleAddItem = async () => {
    try {
      // const response = await fetch('/api/items', {
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(newItem),
      // });
      // const addedItem = await response.json();
      // setItems([...items, addedItem]);
      console.log("new added item", newItem);

      setAddItemOpen(false);
      setNewItem({
        imstype: '',
        id: '',
        name: '',
        unitPrice: '',
        quantity: '',
        minQuantity: '',
        status: '',
        supplierName: '',
        supplierMobile: ''
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const toggleAddItemForm = () => {
    setAddItemOpen(!addItemOpen);
  };

  const filteredItems = selectedType === 'ALL STORES' ? items : items.filter(item => item.imstype === selectedType);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center mb-4">Inventory Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <h2 className="text-lg font-semibold">IMS Type</h2>
          <ul>
            {imsTypes.map((type, index) => (
              <li
                key={index}
                onClick={() => handleTypeClick(type)}
                className={`p-2 cursor-pointer ${selectedType === type ? 'bg-green-500 text-white' : 'hover:bg-gray-200'}`}
              >
                {type}
              </li>
            ))}
          </ul>
          {
            addItemOpen ? " " : (
              <button
                onClick={toggleAddItemForm}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                <AddCircleOutlineIcon /> Add IMS
              </button>
            )
          }
        </div>

        <div className="col-span-12 md:col-span-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">IMS Type</th>
                  <th className="py-2 px-4 border-b">Item ID</th>
                  <th className="py-2 px-4 border-b">Item Name</th>
                  <th className="py-2 px-4 border-b">Unit Price</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Min Quantity</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Supplier Name</th>
                  <th className="py-2 px-4 border-b">Supplier Mobile</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <select
                          name="imstype"
                          value={editedItem.imstype}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        >
                          {imsTypes.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : item.imstype}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <input
                          type="text"
                          name="id"
                          value={editedItem.id}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        />
                      ) : item.id}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editedItem.name}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        />
                      ) : item.name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <input
                          type="text"
                          name="unitPrice"
                          value={editedItem.unitPrice}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        />
                      ) : item.unitPrice}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <input
                          type="text"
                          name="quantity"
                          value={editedItem.quantity}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        />
                      ) : item.quantity}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <input
                          type="text"
                          name="minQuantity"
                          value={editedItem.minQuantity}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        />
                      ) : item.minQuantity}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <select
                          name="status"
                          value={editedItem.status}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        >
                          {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : item.status}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <input
                          type="text"
                          name="supplierName"
                          value={editedItem.supplierName}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        />
                      ) : item.supplierName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <input
                          type="text"
                          name="supplierMobile"
                          value={editedItem.supplierMobile}
                          onChange={handleInputChange}
                          className="w-full p-1"
                        />
                      ) : item.supplierMobile}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItemId === item.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdateClick}
                            className="bg-green-500 text-white p-1 rounded"
                          >
                            <SaveIcon />
                          </button>
                          <button
                            onClick={() => setEditingItemId(null)}
                            className="bg-red-500 text-white p-1 rounded"
                          >
                            <CancelIcon />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="bg-blue-500 text-white p-1 rounded"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="bg-red-500 text-white p-1 rounded"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {addItemOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Add New IMS Item</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <input
                type="text"
                name="id"
                value={newItem.id}
                onChange={handleNewItemChange}
                placeholder="Item ID"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleNewItemChange}
                placeholder="Item Name"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="unitPrice"
                value={newItem.unitPrice}
                onChange={handleNewItemChange}
                placeholder="Unit Price"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="quantity"
                value={newItem.quantity}
                onChange={handleNewItemChange}
                placeholder="Quantity"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="minQuantity"
                value={newItem.minQuantity}
                onChange={handleNewItemChange}
                placeholder="Min Quantity"
                className="w-full mb-2 p-2 border rounded"
              />
              <select
                name="imstype"
                value={newItem.imstype}
                onChange={handleNewItemChange}
                className="w-full mb-2 p-2 border rounded"
              >
                <option disabled value={""}>Select IMS Type</option>
                {imsTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                name="status"
                value={newItem.status}
                onChange={handleNewItemChange}
                className="w-full mb-2 p-2 border rounded"
              >
                <option disabled value={""} >Select Status</option>
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <input
                type="text"
                name="supplierName"
                value={newItem.supplierName}
                onChange={handleNewItemChange}
                placeholder="Supplier Name"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="supplierMobile"
                value={newItem.supplierMobile}
                onChange={handleNewItemChange}
                placeholder="Supplier Mobile"
                className="w-full mb-2 p-2 border rounded"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAddItem}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add Item
                </button>
                <button
                  onClick={toggleAddItemForm}
                  className="bg-gray-300 px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
