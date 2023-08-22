import React from 'react';
import { Table, Button } from 'react-bootstrap';
// import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
import { FaBeer, FaEdit, FaTrash } from 'react-icons/fa';
const UserTable = ({ users, handleEdit, handleDelete }) => {
  return (
    <div className='mt-4'>
      <h2>Registered Users</h2>
      <div className='p-4 my-4 tableDiv'>
        {users.length>0 ?
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Addresses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.dob}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.addresses.join(', ')}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(index)} className='mx-2'>
                    <FaEdit/>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                <FaTrash/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      :
      <h5 style={{textAlign:"center"}}>No Data Available</h5>
        }
      </div>
    </div>
  );
};

export default UserTable;
