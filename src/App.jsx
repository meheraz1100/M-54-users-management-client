import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}

    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const newUser = [...user, data]
      setUsers(newUser)

      form.reset()
    })
  }

  

  return (
    <>
      <div>
      <h1>Users Management System</h1>
      <h1>Numbers of users : {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id}. {user.name} {user.email}</p>)
        }
      </div>
      </div>
    </>
  )
}

export default App



// const handleAddUser = (e) => {
//   e.preventDefault()
//   const form = e.target;
//   const name = form.name.value;
//   const email = form.email.value;
//   const user = {name, email}
//   console.log(user);
//   fetch('http://localhost:5000/users', {
//     method: "POST",
//     headers: {
//       "content-type": "application/json"
//     },
//     body: JSON.stringify(user)
//   })
//   .then(res => res.json())
//   .then(data => {
//     console.log(data)
//     const newUser = [...users, data]
//     setUsers(newUser)

//     form.reset()
//   })
// }