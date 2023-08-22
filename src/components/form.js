import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import UserTable from './table';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const RegistrationForm = ({ users, setUsers, editingIndex, setEditingIndex }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dob: '',
        phoneNumber: '',
        addresses: [''],
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [id, setId] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (editingIndex !== null) {
            const editedUser = users[editingIndex];
            setFormData({
                name: editedUser.name,
                age: editedUser.age,
                dob: editedUser.dob,
                phoneNumber: editedUser.phoneNumber,
                addresses: editedUser.addresses.slice(),
                password: editedUser.password,
                confirmPassword: editedUser.confirmPassword,
            });
        }
    }, [editingIndex, users]);

    const handleAddressChange = (index, value) => {
        const newAddresses = [...formData.addresses];
        newAddresses[index] = value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            addresses: newAddresses,
        }));
    };
    console.log(formData.addresses,'addddrree')

    const handleAddAddress = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            addresses: [...prevFormData.addresses, ''],
        }));
        
    };

    const handleRemoveAddress = (index) => {
        if (formData.addresses.length > 1) {
            const newAddresses = [...formData.addresses];
            newAddresses.splice(index, 1);
            setFormData((prevFormData) => ({
                ...prevFormData,
                addresses: newAddresses,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const updatedUser = { ...formData };
            setUsers((prevUsers) => {
                const newUsers = [...prevUsers];
                if (editingIndex !== null) {
                    newUsers[editingIndex] = updatedUser;
                } else {
                    newUsers.push(updatedUser);
                }
                return newUsers;
            });
            console.log(users,'userss')
            toast.success("data added successfully")
            setFormData({
                name: '',
                age: '',
                dob: '',
                phoneNumber: '',
                addresses: [''],
                password: '',
                confirmPassword: '',
            });
            setEditingIndex(null);
        }
    };

    const validateForm = (data) => {
        const errors = {};

        // Validate Name
        if (!data.name) {
            errors.name = 'Name is required.';
        } else if (data.name.length > 20) {
            errors.name = 'Name should be at most 20 characters long.';
        } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
            errors.name = 'Name cannot contain numbers or special characters.';
        }

        // Validate Date of Birth
        if (!data.dob) {
            errors.dob = 'Date of birth is required.';
        } else if (new Date(data.dob) > new Date()) {
            errors.dob = "Date of birth can't be in the future.";
        }

        // Validate Phone Number
        if (!data.phoneNumber) {
            errors.phoneNumber = 'Phone number is required.';
        } else if (!/^\d{8,10}$/.test(data.phoneNumber)) {
            errors.phoneNumber = 'Phone number should be 8 to 10 digits long and contain only numbers.';
        }

        // Validate Address
        data.addresses.forEach((address, index) => {
            if (!address) {
                errors[`address${index}`] = 'Address is required.';
            }
        });

        // Validate Password
        if (data.password.length < 10) {
            errors.password = 'Password must be at least 10 characters long.';
        } else if (!/(?=.*[!@#$%^&*])(?=.*[A-Z])/.test(data.password)) {
            errors.password = 'Password must contain at least one special character and one uppercase letter.';
        }

        // Validate Confirm Password
        if (data.confirmPassword !== data.password) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return errors;
    };

    return (
        <div className=''>
            <h2>{editingIndex !== null ? 'Edit User' : 'Registration Form'}</h2>
            <ToastContainer/>
            <Form
                className='my-4'>
                {/* <Form.Control
                    type="hidden"
                    value={id}
                /> */}
                <Form.Group controlId="formName">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formAge">
                    <Form.Label>Age*</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formDOB">
                    <Form.Label>Date of birth*</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter date of birth"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        isInvalid={!!errors.dob}
                    />
                    <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number*</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        isInvalid={!!errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formAddresses">
                    <Form.Label>Address*</Form.Label>
                    {formData.addresses.map((address, index) => (
                        <div key={index} className="address-group">
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                name={`address${index}`}
                                value={address}
                                onChange={(e) => handleAddressChange(index, e.target.value)}
                                isInvalid={!!errors[`address${index}`]}
                            />
                            {index > 0 && (
                                <Button
                                    variant="danger"
                                    size="l"
                                    onClick={() => handleRemoveAddress(index)}
                                    className="remove-address-btn"
                                >
                                    <FaMinus />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="success" size="l" onClick={handleAddAddress}>
                        <FaPlus />
                    </Button>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="submitbtn" onClick={handleSubmit}> {editingIndex !== null ? 'Update' : 'Submit'}</Button>
            </Form>
        </div>
    );
};

export default RegistrationForm;
