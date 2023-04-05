import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { FcLike } from 'react-icons/fc'

const IndexStories = () => {

    const [stories, setStories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [storiesPerPage] = useState(12)

    const FetchAllStories = async () => {
        try{
            const response = await axios.get(process.env.REACT_APP_BASE_URL + '/story')
            let data = response.data
            setStories(data)
        }catch(err) {
            console.log(err.message)
        }
    }

    console.log(stories)

    useEffect(() => {
        FetchAllStories()
    }, [])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const indexofLastStory = currentPage * storiesPerPage
    const indexOfFirstStory = indexofLastStory - storiesPerPage
    const currentstory = stories.slice(indexOfFirstStory, indexofLastStory)
    const totalStories = stories.length

    const pageNumbers = []
    const numberOfPages = Math.ceil(totalStories / storiesPerPage)
    for(let i= 1; i <= numberOfPages; i++) {
        pageNumbers.push(i)
    }

    if(stories) {
        return ( 
            <>
                <div className="stories-container">
                <div className="grid-container">
                    {
                        currentstory.map(story => (
                            <Link style={{textDecoration: 'none', color: "black"}} to={`/story/${story._id}`} >
                                <div className="index-story-container">
                                    <div className="story-info">
                                        {/* <div className="index-image-container"> */}
                                            <img src={story.image} alt="story cover"/>
                                        {/* </div> */}
                                        <div className="index-story-info">
                                            <div className="index-story-title">{story.title}</div>
                                            <div className="index-genre-likes">
                                                <div>{story.genre}</div>
                                                <div className="index-likes"><FcLike /> {story.likes}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                    </div>
             </div>
             <nav className="pagination-container">
                {
                pageNumbers.map(number => (
                    <button className="paginate-buttons" onClick={() => paginate(number)} key={number}>
                        {number}
                    </button>
                ))
                }
            </nav>
            </>
         );
    }
}
 
export default IndexStories;