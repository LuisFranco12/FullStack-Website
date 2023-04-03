import axios from 'axios'
import { useEffect, useRef, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'

const EditStory = ({user}) => {

    const [story, setStory] = useState({})

        let image = useRef()
        let title = useRef()
        let synopsis = useRef()
        let genre = useRef()
        let body = useRef()

    const storyId = useParams()
    
    useEffect(() => {
        const getStory = async () => {
            const response = await axios.get(`http://localhost:8080/story/${storyId.id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            const data = await response.data
            setStory(response.data)
        }
        getStory()

    }, [storyId.id])

    console.log(story)


    const handleSubmit = async (e) => {
        e.preventDefault()

        let editedStory = {
            image: image.current.value,
            title: title.current.value,
            synopsis: synopsis.current.value,
            genre: genre.current.value,
            author: user.username,
            body: body.current.value
        }

        await axios.put(`http://localhost:8080/story/${story._id}`, editedStory, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
    }

    return ( 
        <div>
            Update Your Story <br />

            <form onSubmit={handleSubmit}>
                
                <label htmlFor="img">Cover Image</label>
                <input type="text" id="img" ref={image} defaultValue={story.image}/><br />


                <label htmlFor="ttl">Story Title</label>
                <input type="text" id="ttl" ref={title} defaultValue={story.title}/> <br />

                <label htmlFor="snps">Synopsis</label>
                <textarea id="snps" ref={synopsis} defaultValue={story.synopsis}/> <br />

                <label htmlFor="gnr">Genre</label>
                <input type="text" id="gnr" ref={genre} defaultValue={story.genre}/> <br />

                <label htmlFor="bdy">Story content</label>
                <textarea id="bdy" ref={body} defaultValue={story.body}/> <br />

                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default EditStory;