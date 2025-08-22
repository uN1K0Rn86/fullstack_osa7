import { Link } from "react-router-dom"
import User from "./User"

const NavBar = () => {
  return (
    <div className='navBar'>
      <Link to='/'>Home</Link>
      <Link to='/users'>Users</Link>
      <User />
    </div>
  )
}

export default NavBar
