//This is a functional component
//Going to be imported into a module

import { useEffect, useState } from "react" //Imports useState
import axios from "axios"; //Import axios
import { useNavigate } from "react-router-dom";
//Doesn't include a class, render method or constructor
export function FCreate() {

    //Creates a variables for title, author and cover with a method to interact with the variable
    //State is not used, since its a functional component we will use a use state which is easier to use
    //and less verbose in terms of lines of code
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cover, setCover] = useState('');

    const navigate = useNavigate(); //upon handleSubmit, this navigates to different page

    //This acts as a hook for our component
    useEffect(()=>{
        setTitle('');
        setAuthor('');
        setCover('');
    },[]) //This empty array stops useEffect from being called multiple times

    //Upon clicking add value, an alert will appear 
    //with the different values for the title, author and cover
    //Create a new book object with the different values
    const handleSubmit = (e) => {
        e.preventDefault(); //Stops handleSubmit from getting called multiple times
        alert(`${title}` + " " + `${author}` + " " + `${cover}`);
        const newBook = {
            title: title,
            cover: cover,
            author: author
        }
        //This is a promise which works asyn to send a book up to server
        axios.post('http://localhost:4000/api/books', newBook)
            .then((res)=>{
                console.log(res);
                navigate('/read'); //This will navigate to the read page after entering book info
            })
            .catch((err)=>{
                console.log(err)
            });
        }
    return (
        <div>
            <h1>Good Morning</h1>
            <form onSubmit={handleSubmit}>
                <div> {/**Div for title*/}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}>
                    </input>
                </div>
                <div> {/**Div for author*/}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}>
                    </input>
                </div>
                <div> {/**Div for cover*/}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cover"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}>
                    </input>
                </div>
                <input type="submit" value="Add Value"></input>
            </form>
        </div>
    )
}