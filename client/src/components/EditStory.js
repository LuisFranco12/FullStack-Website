import axios from 'axios'
import { useEffect, useRef, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditStory = ({user}) => {

    const [story, setStory] = useState({})

    let image = useRef()
    let title = useRef()
    let synopsis = useRef()
    let genre = useRef()
    let body = useRef()

    let navigate = useNavigate()

    const storyId = useParams()
    
    useEffect(() => {
        const getStory = async () => {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/story/${storyId.id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
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

        await axios.put(process.env.REACT_APP_BASE_URL + `/story/${story._id}`, editedStory, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })

        navigate(`/story/${story._id}`)
    }

    return ( 
        <div style={{ 
            display: 'block', 
            width: 700, 
            padding: 30,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid black',
            backgroundColor: '#333',
            color: 'white'
             }}>
            <h4>Edit story</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Image:</Form.Label>
                {/* <Form.Control size="lg" type="file" name="image" ref={image}/> */}
                {/* <Form.Label>Image:</Form.Label> */}
                <Form.Control size="lg"  name="image" type="text" ref={image} defaultValue={story.image} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title:</Form.Label>
                <Form.Control size="lg"  name="title" type="text" ref={title} defaultValue={story.title} />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Synopsis</Form.Label>
                  <Form.Control size='lg' name="synopsis" ref={synopsis} as="textarea" rows={2} defaultValue={story.synopsis} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Genre:</Form.Label>
                <Form.Control size="lg"  name="genre" type="text" ref={genre} defaultValue={story.genre} />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control size='lg' name="content" ref={body} as="textarea" rows={5} defaultValue={story.body} />
              </Form.Group>
              <Button variant="secondary" size="lg" type="submit">
                Edit
              </Button>
          </Form>
        </div>
     );
}
 
export default EditStory;