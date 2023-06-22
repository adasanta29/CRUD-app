import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Comics = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchAllComics = async () => {
            try{
                const res = await axios.get("http://localhost:8800/comics")
                setComics(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllComics()
    }, []);

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:8800/comics/"+id)
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h1>Santa's Comic Shop</h1>
        <div className="comics">
            {comics.map(comic => (
                <div className="comic" key={comic.id}>
                    {comic.cover && <img src={comic.cover} alt=''/>}
                    <h2>{comic.title}</h2>
                    <p>{comic.desc}</p>
                    <span>{comic.price}</span>
                    <button className='delete' onClick={() => handleDelete(comic.id)}>Delete</button>
                    <button className='update'><Link to={`/update/${comic.id}`}>Update</Link></button>
                </div>
            ))}
        </div>
        <button><Link to='/add'>Add new comics</Link></button>
    </div>
  )
}

export default Comics