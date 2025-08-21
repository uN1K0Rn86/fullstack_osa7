import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Togglable from "./components/Togglable"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import AddBlogForm from "./components/AddBlogForm"
import User from "./components/User"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import "./index.css"

const App = () => {
  const user = useSelector(state => state.user)
  const formRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <h2>Blogs</h2>
          <User />
          <br />
          <Togglable buttonLabel='Add New Blog' ref={formRef}>
            <AddBlogForm formRef={formRef} />
          </Togglable>
          <br />
          <BlogList username={user.username} />
        </div>
      )}
    </div>
  )
}

export default App
