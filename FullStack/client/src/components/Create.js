import axios from 'axios'

import { useRef } from "react";

const Create = ({ user }) => {
    console.log(user)
    let image = useRef()
    let title = useRef()
    let synopsis = useRef()
    let genre = useRef()
    let body = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()

        let story = {
            image: image.current.value,
            title: title.current.value,
            synopsis: synopsis.current.value,
            genre: genre.current.value,
            author: user.username,
            body: body.current.value
        }
        try{
            await axios.post('http://localhost:8080/story', story, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
        }catch(err){
            console.log(err.message)
        }
    }

    return ( 
        <div>
            Submit Your Own Story <br />

            requirements: <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="img">Cover Image</label>
                <input type="text" id="img" ref={image}/><br />


                <label htmlFor="ttl">Story Title</label>
                <input type="text" id="ttl" ref={title}/> <br />

                <label htmlFor="snps">Synopsis</label>
                <textarea id="snps" ref={synopsis}/> <br />

                <label htmlFor="gnr">Genre</label>
                <input type="text" id="gnr" ref={genre}/> <br />

                <label htmlFor="bdy">Story content</label>
                <textarea id="bdy" ref={body}/> <br />

                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default Create;