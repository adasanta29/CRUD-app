import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [comic, setComic] = useState({
        title: '',
        desc: '',
        price: null,
        cover: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

    const comicId = location.pathname.split('/')[2];

    const handleChange = (e) => {
        setComic(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/comics/" + comicId, comic)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <div className='form'>
        <h1>Update The Comic</h1>
        <input type="text" placeholder='title' name='title' onChange={handleChange}/>
        <input type="text" placeholder='desc' name='desc' onChange={handleChange}/>
        <input type="number" placeholder='price' name='price' onChange={handleChange}/>
        <input type="text" placeholder='cover' name='cover' onChange={handleChange}/>

        <button onClick={handleClick} className='formButton'>Update</button>
    </div>
  )
}

export default Update;