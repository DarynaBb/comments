import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

function Form() {
    const [user, setUser] = useState({name: "", comment:""});
    const [userComments, setUserComments] = useState(
        JSON.parse(localStorage.getItem("usersArray")) || []
      );
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        localStorage.setItem('usersArray', JSON.stringify(userComments));
        setCounter(userComments.length);
      }, [userComments]);


    const onChangeHandler = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }
    
    const onClickHandler = (event) => {
        const newUser = user;
        console.log(newUser)
        event.preventDefault();
        if (newUser.comment) {
            setUserComments([...userComments, newUser]);
        }
        setUser({name:"", comment:""})
    }

    const removeComment = (comment) => {
        setUserComments(prevComments => {
            const updatedUserComments = prevComments.filter(userComment => userComment.comment !== comment )
            return updatedUserComments;
        })  
        counter > 0 ? setCounter(prevValue => prevValue -1) : setCounter(0);
    }
    
  return (
    <>
        <h2 className='text-center mb-[20px] text-xl'>Schreib einen Kommentar</h2>
        <div>
            <p className='my-[20px] text-center'><FontAwesomeIcon icon={faComment} /> {counter} Kommentaren </p>
            <ul className='flex justify-center flex-wrap gap-[10px]'>
                {userComments.map((userComment, index) => (
                    <li key={index} className='my-[10px] border-2 rounded-[5px] p-[15px] card flex flex-col justify-center'>
                        <div className='p-[10px]'>
                            <p><span className='font-semibold'>Name:</span>  {userComment.name}</p>
                            <p><span className='font-semibold'>Commentar:</span> {userComment.comment}</p>
                        </div>
                        
                        <button onClick={() => removeComment(userComment.comment)} className='btn border-[1px] rounded-[8px] p-[5px] cursor-pointer mt-[10px] text-sm'>Kommentar löschen</button>
                    </li>
                ))}
            </ul>
        </div>
        <form className='flex flex-col justify-center items-center'>
            <div className='flex flex-col text-center my-[20px] w-[50%] gap-[10px]'>
                <label htmlFor="comment ">Kommentar</label>
                <textarea onChange={onChangeHandler} className='block border-2 rounded-[5px]' name="comment" id="" cols="30" rows="10" value={user.comment}></textarea>
            </div>
            <div className='flex flex-col text-center my-[20px] w-[50%] gap-[10px]'>
                <label htmlFor="name">Name*</label>
                <input onChange={onChangeHandler} className='block border-2 rounded-[5px] p-[5px]' type="text" name="name" value={user.name} />
            </div>
            
            <div>
                <input className='mr-[5px]' type="checkbox" />
                <label htmlFor="check">Meinen Namen, E-Mail und Website in diesem Browser speichern, bis ich wieder kommentiere</label> 
            </div>
            <div>
                <input className='mr-[5px]' type="checkbox" />
                <label htmlFor="check">Ich habe die Datenschutzerklärung gelesen und akzeptiere sie. *</label> 
            </div>

            <button onClick={onClickHandler} className='my-[30px] border-[1px] rounded-[10px] py-[10px] px-[15px]'>Kommentar abschicken</button>
        </form>
    </>
    
  )
}


export default Form