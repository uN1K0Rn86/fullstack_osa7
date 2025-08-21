import { useSelector } from "react-redux"

const UserView = () => {
  const users = useSelector(state => state.users)

  const columnStyle = {
    minWidth: "250px",
  }

  return (
    <div>
      <h2>Users</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th style={columnStyle}>Username</th>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserView
