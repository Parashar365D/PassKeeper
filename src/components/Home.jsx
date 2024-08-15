import './Home.css';
import React, { useEffect, useState } from 'react';
import eye from "../assets/eye.png";
import eyeclose from "../assets/eyeclose.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function Home() {

    const [spassword, setSpassword] = useState(false);
    const [formData, setFormData] = useState({ title: '', uname: '', password: '' });
    const [passwordArr, setPasswordArr] = useState([]);

    // Load passwords from localStorage
    useEffect(() => {
        const storePassword = localStorage.getItem('passwords');
        if (storePassword) {
            setPasswordArr(JSON.parse(storePassword));
        }
    }, []);

    // Toggle password 
    const showpassword = () => {
        setSpassword(!spassword);
    };

    //Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Copy text to clipboard
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    // Save form data to local storege
    const saveForm = (e) => {
        e.preventDefault();
        setPasswordArr([...passwordArr, { ...formData, id: uuidv4() }]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArr, { ...formData, id: uuidv4() }]));
        setFormData({ title: '', uname: '', password: '' });
    };

    // Edit form data to local storege
    const handleEdit = (id) => {
        setFormData(passwordArr.filter(i => i.id === id)[0]);
        setPasswordArr(passwordArr.filter(item => item.id !== id));
    };

    // Delete form data to local storege
    const handleDelete = (id) => {
        let conFirm = confirm("Do you really want to delete this password?");
        if (conFirm) {
            setPasswordArr(passwordArr.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArr.filter(item => item.id !== id)));
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClickrtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" /><ToastContainer />
            <main>
                <div className="box1">
                    <p>Your Password Manager</p>
                </div>
                <div className="box2">
                    <form onSubmit={saveForm}>
                        <div className='input-field'>
                            <label htmlFor="title">Website URL</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className='input-field'>
                            <label htmlFor="uname">Username</label>
                            <input type="text" name="uname" id="uname" value={formData.uname} onChange={handleChange} required />
                        </div>
                        <div className='input-field'>
                            <label htmlFor="password">Password</label>
                            <div className='input-pass'>
                                <input className='input-pass' type={spassword ? 'text' : 'password'} name="password" id="password" value={formData.password} onChange={handleChange} required />
                                <span className='eye' onClick={showpassword}><img src={spassword ? eye : eyeclose} width={30} height={30} alt="eye" /></span>
                            </div>
                        </div>
                        <button className='btn' type='submit'><lord-icon src="https://cdn.lordicon.com/zrkkrrpl.json" trigger="hover" stroke="bold"></lord-icon>Save Password</button>
                    </form>
                </div>
                <div className="box3">
                    <h2>Your Passwords</h2>
                    {passwordArr.length === 0 && <p>No passwords saved yet.</p>}
                    {passwordArr.length != 0 && <table className="pass-table">
                        <thead>
                            <tr>
                                <th>Web URL</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArr.map((item, index) => {
                                return <tr key={index}>
                                    <td>
                                        <div className='td-body'>
                                            <a href={item.title} target='_blank'>{item.title}</a>
                                            <div className='copy' onClick={() => copyText(item.title)}><i className="fa-solid fa-copy"></i></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='td-body'>
                                            <span>{item.uname}</span>
                                            <div className='copy' onClick={() => copyText(item.uname)}><i className="fa-solid fa-copy"></i></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='td-body'>
                                            <span>{item.password}</span>
                                            <div className='copy' onClick={() => copyText(item.password)}><i className="fa-solid fa-copy"></i></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='td-body'>
                                            <div className='copy' onClick={() => handleEdit(item.id)}><i className="fa-solid fa-edit"></i></div>
                                            <div className='copy' onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></div>
                                        </div>
                                    </td>
                                </tr>;
                            })}
                        </tbody>
                    </table>
                    }
                    <div className="pass-table2">
                        {passwordArr.length > 0 ? (
                            passwordArr.map((item, index) => (
                                <div key={index} className="password-item">
                                    <h3 className="section-title">Website URL</h3>
                                    <div className="password-detail">
                                        <a href={item.title} target='_blank'>{item.title}</a>
                                        <span className='copy' onClick={() => copyText(item.title)}><i className="fa-solid fa-copy"></i></span>
                                    </div>
                                    <h3 className="section-title">Username</h3>
                                    <div className="password-detail">
                                        <p>{item.uname}</p>
                                        <span className='copy' onClick={() => copyText(item.uname)}><i className="fa-solid fa-copy"></i></span>
                                    </div>
                                    <h3 className="section-title">Password</h3>
                                    <div className="password-detail">
                                        <p>{item.password}</p>
                                        <span className='copy' onClick={() => copyText(item.password)}><i className="fa-solid fa-copy"></i></span>
                                    </div>
                                    <h3 className="section-title">Actions</h3>
                                    <div className="password-actions">
                                        <span className='copy' onClick={() => handleEdit(item.id)}><i className="fa-solid fa-edit"></i></span>
                                        <span className='copy' onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></span>
                                    </div>
                                </div>
                            ))) : (<p className="no-passwords">No passwords saved yet.</p>)}
                    </div>
                </div>

            </main>
        </>
    );
}

export default Home;