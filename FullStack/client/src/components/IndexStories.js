import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

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
            <div>

                {
                    stories.map(story => (
                        <Link to={`/story/${story._id}`} >
                            <div>
                                <img src={story.image} alt="story cover"/>
                                <p>{story.title}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
         );
    }
}
 
export default IndexStories;