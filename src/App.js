import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import RegistrationForm from './components/form';
import './App.css';
import UserTable from './components/table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [users, setUsers] = useState([]);

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    // setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
    setUsers((prevUsers) => {
      const newProducts = [...prevUsers];
      newProducts.splice(index, 1);
      return newProducts;
    });
    toast.success("data removed")
  };
  return (
    <Container>
      <div className='mainDiv'>
        <ToastContainer/>
     <RegistrationForm
            users={users}
            setUsers={setUsers}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />
           <UserTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </Container>
  );
};

export default App;
