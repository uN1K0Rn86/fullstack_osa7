import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { setNotification } from "../reducers/notificationReducer"

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = async event => {
    event.preventDefault()

    const loggedOutUserJSON = window.localStorage.getItem("loggedBlogappUser")
    const loggedOutUser = JSON.parse(loggedOutUserJSON)

    window.localStorage.removeItem("loggedBlogappUser")

    dispatch(setUser(null))
    dispatch(setNotification(`${loggedOutUser.username} successfully logged out`, "success"))
  }

  return (
    <div>
      {user.name} logged in
      <form onSubmit={handleLogout}>
        <button type='submit'>Logout</button>
      </form>
    </div>
  )
}

export default User
