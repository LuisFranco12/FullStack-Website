import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({setUser}) => {

    let navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const {username, email, password} = formData

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const Response = await axios.post(process.env.REACT_APP_BASE_URL + "/users", formData)
            console.log(Response.data.token)
            localStorage.setItem("token", Response.data.token)

            const info = await axios.get(process.env.REACT_APP_BASE_URL + "/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUser(info.data)
            console.log(info)
            navigate('/')
        }catch(err) {
            alert(err.response.data.error)
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
                  border: '1px solid black'
                   }}>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Enter A Username:</Form.Label>
                    <Form.Control size="lg"  onChange={handleChange} name="username" type="text" placeholder="Enter A Username" value={username} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control size="lg" onChange={handleChange} type="email" placeholder="Enter email" name="email" value={email}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control size="lg" onChange={handleChange} type="password" placeholder="Enter A Password" name="password" value={password}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
        </div>
     );
}
 
export default Register;