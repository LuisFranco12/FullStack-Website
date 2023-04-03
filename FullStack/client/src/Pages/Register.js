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
            const Response = await axios.post("http://localhost:8080/users", formData)
            console.log(Response.data.token)
            localStorage.setItem("token", Response.data.token)

            const info = await axios.get("http://localhost:8080/users", {
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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={username}
                    placeholder="Username" 
                />
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    placeholder="Email" 
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    placeholder="Password" 
                />
                <button>Register</button>
            </form>
        </div>
     );
}
 
export default Register;