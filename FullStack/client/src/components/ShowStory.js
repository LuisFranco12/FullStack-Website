import { useNavigate, Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
const ShowStory = ({user}) => {

    const [story, setStory] = useState({})

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

    }

    console.log(story.reviews)

    if(story) {
        return ( 
            <div>
                <div>
                    {story.image}
    
                    {
                        story.author === user ?
                            <>
                                <button onClick={deleteStory}>Delete</button>
                                <Link to={`/story/edit/${story._id}`}>
                                    Update Story
                                </Link>
                            </>
                        :
                            ""
                    }
                </div>
    
                <div>
                    {
                        user &&
                            <form onSubmit={leaveAReview}>
                                <label htmlFor="R-ttl">Review Title</label> <br />
                                <input type="text" id="R-ttl" name="title" ref={title}/> <br />
    
                                <label htmlFor="R-bdy">Review Content</label> <br />
                                <textarea name="body" id="R-bdy" cols="30" rows="3" ref={content}/> <br />
    
                                {/* add a rating */}
    
                                <button>Review</button>
                            </form>
                    }
    
                    {/* {
                        story.reviews.length <= 0 ?
                        <>
                            Be the first to leave a review!
                        </>
                    :
                        <>
                            gul
                        </>
                    } */}

                    {
                        story.reviews.map(review => (
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
    
                
    
            </div>
         );
    }
}
 
export default ShowStory;