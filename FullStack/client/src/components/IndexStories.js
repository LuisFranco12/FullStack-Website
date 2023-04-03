import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { FcLike } from 'react-icons/fc'

const IndexStories = () => {

    const [stories, setStories] = useState([])

    const FetchAllStories = async () => {
        try{
            const response = await axios.get('http://localhost:8080/story')
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

    if(stories) {
        return ( 
            <div className="stories-container">
                <div className="grid-container">
                    {
                        stories.map(story => (
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
         );
    }
}
 
export default IndexStories;