import React, { useEffect, useState } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import validator from "validator";
import { Multiselect } from "multiselect-react-dropdown";

const options = [
    { name: "Sports", id: 1 },
    { name: "Reading", id: 2 },
    { name: "Gaming", id: 3 },
    { name: "Dancing", id: 4 },
    { name: "Travelling", id: 5 },
    { name: "studying", id: 6 },
    { name: "Coding", id: 7 }
];


function Form() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState(new Date());
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleChangeEmail = (e) => {
        const { value } = e.target;
        setEmail(value);
        validateEmail(value);
    };

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [removedOptions, setRemovedOptions] = useState([]);
    const onSelectOptions = (selectedList, selectedItem) => {
        setSelectedOptions([...selectedOptions, selectedItem]);
    };
    const onRemoveOptions = (selectedList, removedItem) => {
        setRemovedOptions([...removedOptions, removedItem]);
    };

    const validateEmail = (email) => {
        if (validator.isEmail(email)) {
            setEmailError('');
        } else {
            setEmailError('Please enter a valid email');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (emailError) {
            alert("Please enter a valid email.");
            return;
        }

        if (!firstname || !lastname || !gender || !phone || !selectedOptions.length) {
            alert("Please fill out all the fields.");
            return;
        }

        const formData = {
            firstname,
            lastname,
            gender,
            phone,
            dob,
            email,
            hobby: selectedOptions.map(option => option.name)
        };

        try {
            const response = await fetch('http://192.168.1.16:15000/test', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data, ':::::::::::::::::Response::::::::');
            setFirstName('');
            setLastName('');
            setGender('');
            setPhone('');
            setDob(new Date());
            setEmail('');
            setSelectedOptions([]);
            window.location.reload();

        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };

    useEffect(() => {

        const container = document.querySelector('.col-md-6');

        const newWidth = '60%';
        const newheight = '60%';

        container.style.backgroundSize = `${newWidth} ${newheight}`;
    }, []);

    return (

        <div className='container mt-5 border  rounded-3'>
            <div className="row ">
                <div className="col-md-6 background-image" style={{
                    backgroundImage: `url("https://www.crowncrypto.in/auth/images/login.png")`,
                    backgroundRepeat: 'no-repeat',
                    borderRight: '30px solid #f0f0f0 ',
                    borderadius: ' 10px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                </div>

                <div className="col-md-6">
                    <h2 className='d-grid mx-auto text-center mt-5'>User Login Form</h2>
                    <form className="row  needs-validation" onSubmit={handleSubmit}>
                        <div className="row mt-5 ">
                            <div className="col-md-12 col-sm-12">
                                <label htmlFor="validationCustom01" className="form-label">First name</label>
                                <input type="text" className="form-control" id="validationCustom01" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <label htmlFor="validationCustom02" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="validationCustom02" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className='col-md-12 col-sm-12  mt-4 pt-2'>
                                <label htmlFor="validationCustom02" className="form-label">Enter Gender : </label>
                                <input type="radio" id="male" value="male" className='ms-3' checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                <label htmlFor="male" className='ms-2'>Male</label>
                                <input type="radio" id="female" className='ms-3' value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                <label htmlFor="female" className='ms-2'>Female</label>
                            </div>
                        </div>

                        <div className="row mt-3">
                            {/* Date Start */}
                            <div className='col-md-12 col-sm-12 col-lg-6   mt-3'>
                                <label htmlFor="validationCustom01" className="form-label">Date of Birth :</label>
                                <DatePicker className='ms-3 mt-1' closeOnScroll={true} selected={dob} value={dob} onChange={(date) => setDob(date)} />
                            </div>
                        </div>
                        {/* Email Start */}

                        <div className='col-md-12  col-sm-12 col-lg-12  mt-5 d-flex '>
                            <label htmlFor="validationCustom01" className="form-label mt-1 mb-3">Enter Your Email :</label>
                            <input type="text" className="form-control w-50 ms-3 mb-3" id="validationCustom01" value={email} onChange={handleChangeEmail} required />
                            <br />
                            <span style={{ fontWeight: "bold", color: "red", display: "block", marginLeft: '20px' }}> {emailError} </span>
                        </div>


                        <div className="row  mt-2">
                            {/* Phone number start */}
                            <div className='col-md-12 col-sm-12   w-50   mt-3'>
                                <label htmlFor="validationCustom01" className="form-label mb-3">Enter Your Phone Number :</label>
                                <PhoneInput country={"in"} enableSearch={true} value={phone} onChange={(phone) => setPhone(phone)} countryCodeEditable={false} required />
                            </div>

                            {/* Hobby Start */}
                            <div className='col-md-12 col-sm-12 w-50 mt-4'>
                                <label htmlFor="validationCustom01" className="form-label mb-3">Select Hobby :</label>
                                <Multiselect options={options} name="particulars" onSelect={onSelectOptions} onRemove={onRemoveOptions} displayValue="name" closeIcon="cancel" placeholder="Select Options" selectedValues={selectedOptions} className="multiSelectContainer w-50" />
                            </div>
                            {/* Hobby End */}
                        </div>
                        <div className=" mx-auto mt-4 d-grid w-50">
                            <button className="btn btn-primary mb-4" type="submit">Submit form</button>
                        </div>
                    </form>
                </div>
            </div>


        </div >

    );
}

export default Form;
