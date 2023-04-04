import { useNavigate, Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { RiDeleteBin6Line } from "react-icons/ri"
const ShowStory = ({user}) => {

    const [story, setStory] = useState({})

    let reviewLength = story.reveiw?.length

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

    const navigate = useNavigate()

    async function deleteStory() {
        try{
            await axios.delete(`http://localhost:8080/story/${story._id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            navigate('/story')
        }catch(err) {
            console.log(err.message)
        }
    }

    let title = useRef()
    let content = useRef()

    const deleteReview = async (R) => {
        console.log(R)
        await axios.delete(`http://localhost:8080/review/${story._id}/${R._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })

        let updatedStory = {...story}
        updatedStory.reviews = updatedStory.reviews.filter(review => review._id !== R._id)
        setStory(updatedStory)
    }

    const leaveAReview = async (e) => {
        e.preventDefault()


        let newReview = {
            title: title.current.value,
            body: content.current.value,
            reviewer: user,
            rating: 5
        }

        try{
            const review = await axios.post(`http://localhost:8080/review/${story._id}`, newReview, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })

            let storyWithReviews = { ...story }
            storyWithReviews.reviews.push(review)
            setStory(storyWithReviews)

            title.current.value = ''
            content.current.value = ''

        }catch(err){
            console.log(err.message)
        }

        window.location.reload();

    }

    if(story) {
        return ( 
            <div className='show-page-container'>
                <div className='show-page'>
                    <div className='show-view-top'> 
                        <div className='show-view-image-container'>
                            <img src={story.image} alt={story.title + " image"}/>
                        </div>
                        <div className='show-view-right'>
                            <h2>{story.title}</h2>
                            <p id='show-view-author'>Author: {story.author}</p>
                            <div>
                                <h5>Synopsis</h5>
                                <p id='synopsis'>{story.synopsis}</p>
                            </div>
                            <p> <span>Genre:</span> {story.genre} </p>

                            <div className='read-edit-delete'>
                                <button id='read'>Read</button>
                            {
                            story.author === user ?
                                <>
                                    <Link id="edit" style={{textDecoration: "none"}} to={`/story/edit/${story._id}`}>
                                        Edit
                                    </Link>
                                    <button onClick={deleteStory} id='delete'><RiDeleteBin6Line /></button>
                                </>
                            :
                                ""
                            }
                            </div>

                        </div>
                    </div>

                    <h3>Leave a Review!</h3>
                    <div className='review-form-container'>
                        {
                            user &&
                                <form className='review-form' onSubmit={leaveAReview}>
                                    <div className='review-title-container'>
                                        <label htmlFor="R-ttl">Review Title</label> <br />
                                        <input type="text" id="R-ttl" name="title" ref={title}/> <br />
                                    </div>
        
                                    <div className='review-content-container'>
                                        <label htmlFor="R-bdy">Review Content</label> <br />
                                        <textarea name="body" id="R-bdy" cols="30" rows="3" ref={content}/> <br />
                                    </div>
        
                                    {/* add a rating */}
                    
                                    <button>Review</button>
                                </form>
                        } 
                    </div>
        
                    {/* <div>
                    
        
                        {
                            story.reviews?.length <= 0 ?
                            <>
                                Be the first to leave a review!
                            </>
                        :
                            <>
                                {reviewLength} review(s)
                            </>
                        }

                        {
                            story.reviews?.map(review => (
                                <div>
                                    <p>{review.title}</p>
                                    <p>reviewer: {review.reviewer}</p>
                                    <p>rating: {review.rating}</p>
                                    <p>{review.body}</p>
                                    <p>likes: {review.likes}</p>
                                    <div>
                                        {
                                            review.reviewer === user ?
                                                <>
                                                    <button onClick={() => deleteReview(review)}>Delete Review</button>
                                                    <Link to={`/story/review/edit/${story._id}/${review._id}`}>
                                                        edit review
                                                    </Link>
                                                </>
                                            :
                                                ''
                                        }
                                    </div>
                                </div>
                            ))
                        }
        
                    </div>
        
                    <br />
        
                    */} */}
        
                </div>
            </div>
         );
    }
}
 
export default ShowStory;