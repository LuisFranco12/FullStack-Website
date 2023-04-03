import axios from 'axios'
import { useEffect, useRef, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'

const EditReview = ({user}) => {
    const [review, setReview] = useState({})

    const storyId = useParams()
    const reviewId = useParams()

    useEffect(() => {
        const getReview = async () => {
            const response = await axios.get(`http://localhost:8080/review/${storyId.sid}/${reviewId.rid}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            const data = await response.data
            setReview(data)
        }
        getReview()
    }, [storyId, reviewId])
    
    let title = useRef()
    let content = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(review)

        let editedReview = {
            title: title.current.value,
            body: content.current.value,
            reviewer: user.username,
            rating: 5
        }

        console.log(storyId.sid, reviewId.rid) 
        await axios.put(`http://localhost:8080/review/${storyId.sid}/${reviewId.rid}`, editedReview, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
    }


    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="R-ttl">Review Title</label> <br />
                <input type="text" id="R-ttl" name="title" ref={title} defaultValue={review.title}/> <br />

                <label htmlFor="R-bdy">Review Content</label> <br />
                <textarea name="body" id="R-bdy" cols="30" rows="3" ref={content} defaultValue={review.body}/> <br />

                {/* add a rating */}

                <button>Review</button>
            </form>
        </div>
     );
}
 
export default EditReview;