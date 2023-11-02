import React from 'react'
import { useState } from 'react'

function Form() {
    const [user, setUser] = useState({name: "", comment:""});
    const [userComments, setUserComments] = useState([]);
    const [counter, setCounter] = useState(0);

    const onChangeHandler = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    
    const onClickHandler = (event) => {
        const newUser = user;
        event.preventDefault();
        setUserComments([...userComments, newUser])
        setUser({name:"", comment:""})
        setCounter((prevValue) => prevValue + 1)
    }

    const removeComment = (comment) => {
        setUserComments(prevComments => {
            const updatedUserComments = prevComments.filter(userComment => userComment.comment !== comment )
            return updatedUserComments;
        })  
        setCounter(prevValue => prevValue -1);
    }
    
  return (
    <>
    <h2 className='text-center mb-[20px]'>Schreib einen Commentar</h2>
        <form className='flex flex-col justify-center items-center'>
            <div>
                <p className='my-[20px]'>Anzahl: {counter}</p>
                <ul>
                    {userComments.map((userComment, index) => (
                        <li key={index} className='my-[10px]'>
                            <p>Name: {userComment.name}</p>
                            <p className='text-center'>Commentar: {userComment.comment}</p>
                            <button onClick={() => removeComment(userComment.comment)} className='border-2'>Den Kommentar löschen</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='text-center my-[20px]'>
                <label htmlFor="comment ">Kommentar</label>
                <textarea onChange={onChangeHandler} className='block border-2' name="comment" id="" cols="30" rows="10" value={user.comment}></textarea>
            </div>
            <div className='my-[20px]'>
                <label htmlFor="name">Name*</label>
                <input onChange={onChangeHandler} className='block border-2' type="text" name="name" value={user.name} />
            </div>
            <button onClick={onClickHandler} className='my-[30px] border-2 rounded-[10px] py-[10px] px-[15px]'>Commentar abschicken</button>
        </form>
    </>
    
  )
}


export default Form