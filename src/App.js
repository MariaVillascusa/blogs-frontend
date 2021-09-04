import './App.css'
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (e) => {
    e.preventDefault()
    blogService.setToken(user.token)
    const title = document.querySelector('.title').value
    const author = document.querySelector('.author').value
    const url = document.querySelector('.url').value

    const newBlog = {
      title,
      author,
      url
    }

    blogService.create(newBlog)
      .then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password
        <input type="text" name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit" className="login-btn">Login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog} className="blogForm">
      <h3>Create a blog</h3>
      <div>
        <div className="label">Title</div>
        <input type="text" name="title" className="title" />
      </div>
      <div>
        <div className="label">Author</div>
        <input type="text" name="author" className="author" />
      </div>
      <div>
        <div className="label">URL</div>
        <input type="text" name="url" className="url" />
      </div>
      <button type="submit" className="create-btn">Create</button>
    </form>)


  if (user === null) {
    return (
      <div className="blogs">
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <div>
        <div className="logged-div">
          <p>{user.name} Logged-in</p>
          <button type="button" onClick={handleLogout} className="logout-btn">Log out</button>
        </div>
        {blogForm()}
        <div className="bloglist">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App