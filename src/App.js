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
  const [notification, setNotification] = useState(null)

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

  const notifyWith = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (err) {
      notifyWith('Wrong username o password', 'error')  
    }
  }

  const addBlog = (e) => {
    e.preventDefault()
    blogService.setToken(user.token)
    let title = document.querySelector('.title')
    let author = document.querySelector('.author')
    let url = document.querySelector('.url')

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService.create(newBlog)
      .then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
    
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' has been added`, 'success')
    title.value = ''
    author.value = ''
    url.value = ''
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
        <Notification notification={notification} />
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
      <Notification notification={notification} />
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