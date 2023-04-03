import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Register from './Pages/Register';
import Navbar from './components/Navbar'
import Login from './Pages/Login'
import { useState, useEffect } from 'react';
import Create from './components/Create';
import IndexStories from './components/IndexStories'
import ShowStory from "./components/ShowStory"
import EditStory from './components/EditStory';
import EditReview from './components/EditReview';
function App() {
  const [user, setUser] = useState({})



  useEffect(() => {

    let getToken = localStorage.getItem("token")

    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users', {
          headers: {
            Authorization: `Bearer ${getToken}`
          }
        })
        setUser(response.data)
      }catch(err) {
        localStorage.removeItem("token")
      }
    }

    if(getToken) {
      getUser()
    }
  }, [])

  let loggedInUser = user.username

  return (
    <>
      <Navbar user={user.username} setUser={setUser}/>
      <Routes>
        {
          loggedInUser ?
            <>
              <Route path="/story" element={ <IndexStories /> }/>
              <Route path="/create" element={<Create user={user}/>}/>
              <Route path="/story/:id" element={ <ShowStory user={user.username}/> }/>
              <Route path="/story/edit/:id" element={ <EditStory user={user}/> }/>
              <Route path="/story/review/edit/:sid/:rid" element={ <EditReview user={user}/> }/>
            </>
          :
            <>
              <Route path="/story" element={ <IndexStories /> }/>
              <Route path="/register" element={<Register setUser={setUser}/>}/>
              <Route path="/login" element={<Login setUser={setUser}/>}/>
            </>
        }
      </Routes>
    </>
  );
}

export default App;
