import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useRef } from "react";
import { useNavigate } from 'react-router-dom';

const Create = ({ user }) => {
    console.log(user)
    let image = useRef()
    let title = useRef()
    let synopsis = useRef()
    let genre = useRef()
    let body = useRef()

    let navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        let story = {
            image: image.current.value,
            title: title.current.value,
            synopsis: synopsis.current.value,
            genre: genre.current.value,
            author: user.username,
            body: body.current.value
        }
        try{
            await axios.post(process.env.REACT_APP_BASE_URL + '/story', story, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            navigate('/')
        }catch(err){
            console.log(err.message)
        }
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
            <h4>Create Your Own Story!</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Image:</Form.Label>
                <Form.Control size="lg"  name="image" type="text" ref={image}  />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title:</Form.Label>
                <Form.Control size="lg"  name="title" type="text" ref={title}  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Synopsis</Form.Label>
                  <Form.Control size='lg' name="synopsis" ref={synopsis} as="textarea" rows={2} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Genre:</Form.Label>
                <Form.Control size="lg"  name="genre" type="text" ref={genre}  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control size='lg' name="content" ref={body} as="textarea" rows={5} />
              </Form.Group>
              <Button variant="secondary" size="lg" type="submit">
                create
              </Button>
          </Form>
  </div>
     );
}
 
export default Create;