import { useNavigate, Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { RiDeleteBin6Line } from "react-icons/ri"
import { ImStarFull } from 'react-icons/im'
import { FaRegCommentDots } from 'react-icons/fa'
import { MdOutlineThumbUp } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineEdit } from "react-icons/ai"
import CreateComment from './CreateComment'
const ShowStory = ({user}) => {

    const [story, setStory] = useState({})
    const [read, setRead] = useState(false)
    const [showComment, setShowComment] = useState(false)

    const storyId = useParams()

    useEffect(() => {
        const getStory = async () => {
            const response = await axios.get(`http://localhost:8080/story/${storyId.id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
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
            navigate('/')
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
    let reviewLength = story.reviews?.length

    const toggleRead = ()  => {
        setRead(!read)
    }

    const toggleComments = ()  => {
        setShowComment(!showComment)
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
                                <button onClick={toggleRead} id='read'>Read</button>
                            {
                            story.author === user ?
                                <>
                                    <Link id="edit" style={{textDecoration: "none", fonstSize:"1.2rem"}} to={`/story/edit/${story._id}`}>
                                        <AiOutlineEdit />
                                    </Link>
                                    <button onClick={deleteStory} id='delete'><RiDeleteBin6Line /></button>
                                </>
                            :
                                ""
                            }
                            </div>

                        </div>
                    </div>
                        {
                            read && 
                                <div className='story-body'>
                                    <h4>{story.title}</h4>
                                    <p>
                                        {story.body}
                                    </p>
                                </div>
                        }

                        {
                            story.author === user ?
                                    <>
                                        <p id='not-allowed'>Cannot review your own work</p>
                                    </>
                                :
                                    user &&
                                    <>
                                        <h3>Leave a Review!</h3>
                                    <form className='review-form' onSubmit={leaveAReview}>
                                        <div className='r-div'>
                                            <label id='R-lbl' htmlFor="R-ttl">Review Title</label>
                                            <input type="text" id="R-ttl" name="title" ref={title}/>
                                        </div>

                                        <div className='r-div'>
                                            <label id='RB-lbl' htmlFor="R-bdy">Review Content</label>
                                            <textarea name="body" id="R-bdy" cols="30" rows="3" ref={content}/>
                                        </div>
                                        {/* add a rating */}
                        
                                        <button className='r-button'>Review</button>
                                    </form>
                                    </>
                        }

                     <h3>{reviewLength} review(s)</h3> 
                     <div className='review-posts-container'>
                        {
                            story.reviews?.map(review => (
                                <div className='review-container'>

                                    <div className='review-top'>
                                        <div className='user-rating'>
                                           <div>
                                                <div ><span>{review.reviewer}</span></div>
                                                <div className='rating'> <ImStarFull id="star"/> {review.rating}</div>
                                           </div>

                                            { 
                                                <>
                                                    {
                                                        review.reviewer === user ?
                                                            <div className='review-edit-delete'>
                                                                <Link style={{textDecoration: 'none'}} to={`/story/review/edit/${story._id}/${review._id}`}>
                                                                    <BiEdit style={{fontSize: "1.2rem"}}/>
                                                                </Link>
                                                                <button style={{color: 'red'}} onClick={() => deleteReview(review)}><RiDeleteBin6Line style={{fontSize: "1.1rem"}} /></button>
                                                            </div>
                                                        :
                                                            ''
                                                    }
                                                </> 
                                              }
                                            
                                        </div>
                                    </div>
                                    <p id="review-content">{review.body}</p>
                                    <div className='comment-likes'>
                                            <button onClick={toggleComments}><FaRegCommentDots /></button>
                                            <div className='likes'>
                                                <button> <MdOutlineThumbUp /></button>
                                                <div id="number">{review.likes}</div>
                                            </div>
                                    </div>
                                        {
                                            showComment && 
                                            <div>
                                                <CreateComment />
                                            </div>
                                        }
                                </div>
                            ))
                        }
        
                    </div>
        
                    <br />
        
                </div>
            </div>
         );
    }
}
 
export default ShowStory;