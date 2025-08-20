import PropTypes from "prop-types"

const User = ({ user, handleLogout }) => {
  return (
    <div>
      {user.name} logged in
      <form onSubmit={handleLogout}>
        <button type='submit'>Logout</button>
      </form>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default User
