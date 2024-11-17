import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

const List = ({url}) => {
  //const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [editData, setEditData] = useState({ name: '', description: '', price: '', category: '' });

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food items");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    if (response.data.success) {
      toast.success("Food item removed successfully");
      fetchList();
    } else {
      toast.error("Error removing food item");
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setEditData({ 
      name: food.name, 
      description: food.description, 
      price: food.price, 
      category: food.category 
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    const response = await axios.put(`${url}/api/food/edit`, { 
      id: editingFood._id, 
      ...editData 
    });
    if (response.data.success) {
      toast.success("Food item updated successfully");
      setEditingFood(null);
      fetchList();
    } else {
      toast.error("Error updating food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h1>All Foods List</h1>
      <Modal isOpen={editingFood !== null} onClose={() => setEditingFood(null)}>
        <h3>Edit Food Item</h3>
        <input 
          type="text" 
          name="name" 
          value={editData.name} 
          onChange={handleEditChange} 
          placeholder="Name" 
        />
        <input 
          type="text" 
          name="description" 
          value={editData.description} 
          onChange={handleEditChange} 
          placeholder="Description" 
        />
        <input 
          type="number" 
          name="price" 
          value={editData.price} 
          onChange={handleEditChange} 
          placeholder="Price" 
        />
        <select 
          name="category" 
          value={editData.category} 
          onChange={handleEditChange}
        >
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure veg">Pure veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>
        <button onClick={saveEdit}>Save</button>
      </Modal>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Edit Option</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
          <div key={item._id} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}৳</p>
            <p onClick={() => handleEdit(item)} className='cursor edit'>Edit</p>
            <p onClick={() => removeFood(item._id)} className='cursor remove'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
