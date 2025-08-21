import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
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
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      dispatch(setNotification(`${user.username} successfully logged in`, "success"))
    } catch (exception) {
      dispatch(setNotification("Incorrect username or password", "error"))
    }
  }

  const handleLogout = async event => {
    event.preventDefault()

    const loggedOutUserJSON = window.localStorage.getItem("loggedBlogappUser")
    const loggedOutUser = JSON.parse(loggedOutUserJSON)

    window.localStorage.removeItem("loggedBlogappUser")

    setUser(null)
    dispatch(setNotification(`${loggedOutUser.username} successfully logged out`, "success"))
  }

  const addLike = async (id, likedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, likedBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)

      dispatch(
        setNotification(`Liked '${returnedBlog.title}' by ${returnedBlog.author}`, "success")
      )
    } catch (exception) {
      let exceptionMessage = "Could not like this blog"
      dispatch(setNotification(exceptionMessage, "error"))
    }
  }

  const deleteBlog = async removedBlog => {
    try {
      if (window.confirm(`Delete '${removedBlog.title}' by ${removedBlog.author}?`)) {
        await blogService.remove(removedBlog.id)
        const blogs = await blogService.getAll()
        setBlogs(blogs)

        dispatch(
          setNotification(
            `Blog '${removedBlog.title}' by ${removedBlog.author} successfully deleted`,
            "success"
          )
        )
      }
    } catch (exception) {
      let exceptionMessage = "Could not delete this blog"
      dispatch(setNotification(exceptionMessage), "error")
    }
  }

  const formRef = useRef()

  return (
    <div>
      <Notification />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          <h2>Blogs</h2>
          <User user={user} handleLogout={handleLogout} />
          <br />
          <Togglable buttonLabel='Add New Blog' ref={formRef}>
            <AddBlogForm formRef={formRef} />
          </Togglable>
          <br />
          <BlogList like={addLike} username={user.username} remove={deleteBlog} />
        </div>
      )}
    </div>
  )
}

export default App
