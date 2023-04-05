import axios from 'axios'
import { useEffect, useRef, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'

const EditReview = ({user}) => {
    const [review, setReview] = useState({})

    const storyId = useParams()
    const reviewId = useParams()

    let navigate = useNavigate()

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

        navigate(`/story/${storyId.sid}`)
    }


    return ( 
        <div className='edit-review-container'>
                <h3 id="edit-h3">Edit Review</h3>
                <form className='review-form' onSubmit={handleSubmit}>
                    <div className='r-div'>
                        <label id='edit-title' htmlFor="R-ttl">Review Title</label>
                        <input type="text" id="R-ttl" name="title" ref={title} defaultValue={review.title}/>
                    </div>

                    <div className='r-div'>
                        <label id='edit-content' htmlFor="R-bdy">Review Content</label>
                        <textarea name="body" id="R-bdy" cols="30" rows="3" ref={content} defaultValue={review.body}/>
                    </div>

                    {/* add a rating */}

                    <button className='r-button'>Edit Review</button> 
                </form>
        </div>
     );
}
 
export default EditReview;