import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

function Form() {
    const [user, setUser] = useState({name: "", comment:""});
    const [userComments, setUserComments] = useState(JSON.parse(localStorage.getItem("usersArray")) || [] );
    
    const [isChecked, setIsChecked] = useState(false);
    const [comments, setComments] = useState([]);
    const [counter, setCounter] = useState(comments.length);


    useEffect(() => {
        localStorage.setItem('usersArray', JSON.stringify(userComments));
        setCounter(userComments.length + comments.length);
      }, [userComments]);

      useEffect(() => {
       
        const fetchData = async () => {
            try {
              const response = await fetch("https://corsproxy.io/?https://tiny-house-helden.de/api/comments.json");
              if (response.ok) {
                const data = await response.json();
                setComments(data); 
                setCounter(comments.length);
              } else {
                console.warn("Response not okay");
              }
            } catch (error) {
              console.error("An error occurred:", error);
            }
          };
        fetchData();  
    }, [])
  
    const onChangeHandler = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }
    
    const onClickHandler = (event) => {
        event.preventDefault();
        if (isChecked) {
            const newUser = user;
        console.log(newUser)
        
        if (newUser.comment) {
            setUserComments([...userComments, newUser]);
        }
        setUser({name:"", comment:""})
        } 
    }

    const removeComment = (comment) => {
        setUserComments(prevComments => {
            const updatedUserComments = prevComments.filter(userComment => userComment.comment !== comment )
            return updatedUserComments;
        })  
        setComments(prevComments => {
            const updatedComments = prevComments.filter(userComment => userComment.text !== comment )
            return updatedComments;
        }) 
        counter > 0 ? setCounter(prevValue => prevValue -1) : setCounter(0);
    }

    const onCklickInput = () => {
        isChecked ? setIsChecked(false) : setIsChecked (true);
    }
    
  return (
    <>
        <h2 className='text-center mb-[20px] text-xl'>Schreib einen Kommentar</h2>
        <div>
            <p className='my-[20px] text-center'><FontAwesomeIcon icon={faComment} /> {counter} Kommentaren </p>
            <ul className='flex justify-center flex-wrap gap-[10px]'>
                {comments.map((comment) => (
                    <li key={comment.id} className='my-[10px] border-2 rounded-[5px] p-[15px] card flex flex-col justify-center w-[50%] shrink'>
                        <div className='p-[10px]'>
                            <p className='text-[14px]'><span className='font-semibold text-[16px]'>Name:</span>  {comment.name}</p>
                            <p className='text-[10px]'>{comment.date}</p>
                            <p className='text-[14px] mt-[5px]'><span className='font-semibold text-[16px]'>Commentar:</span> {comment.text}</p>
                        </div>
                        <button onClick={() => removeComment(comment.text)} className='btn border-[1px] rounded-[8px] p-[5px] cursor-pointer mt-[10px] text-sm self-end justify-self-end'>Kommentar löschen</button>
                    </li>
                ))}
                {userComments.map((userComment, index) => (
                    <li key={index} className='basis-[50%] my-[10px] border-2 rounded-[5px] p-[15px] card flex flex-col justify-center'>
                        <div className='p-[10px]'>
                            <p className='text-[14px]'><span className='font-semibold text-[16px]'>Name:</span>  {userComment.name}</p>
                            <p className='text-[14px] mt-[5px]'><span className='font-semibold text-[16px]'>Commentar:</span> {userComment.comment}</p>
                        </div>
                        
                        <button onClick={() => removeComment(userComment.comment)} className='btn border-[1px] rounded-[8px] p-[5px] cursor-pointer mt-[10px] text-sm self-end justify-self-end'>Kommentar löschen</button>
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
                <input className='mr-[5px]' type="checkbox" onClick={onCklickInput}/>
                <label className={isChecked ? "" : "bg-red-500"} htmlFor="check">Ich habe die Datenschutzerklärung gelesen und akzeptiere sie. *</label> 
            </div>

            <button onClick={onClickHandler} className='my-[30px] border-[1px] rounded-[10px] py-[10px] px-[15px]'>Kommentar abschicken</button>
        </form>
    </>
    
  )
}


export default Form