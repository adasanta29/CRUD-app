import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [comic, setComic] = useState({
        title: '',
        desc: '',
        price: null,
        cover: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setComic(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/comics", comic)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <div className='form'>
        <h1>Add New Comic</h1>
        <input type="text" placeholder='title' name='title' onChange={handleChange}/>
        <input type="text" placeholder='desc' name='desc' onChange={handleChange}/>
        <input type="number" placeholder='price' name='price' onChange={handleChange}/>
        <input type="text" placeholder='cover' name='cover' onChange={handleChange}/>

        <button onClick={handleClick} className='formButton'>Add</button>
    </div>
  )
}

export default Add;