import { useState, useEffect } from 'react'

import axios from 'axios';


const BASE_URL = "http://localhost:3001"
function App() {
  // setting up state for posts and setting posts
  //setting up the state for new posts title and content will be added for these 
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost]= useState({ title: '', content: '' })
  const handleDelete = async(postId) =>{
    try{
      await axios.delete(`${BASE_URL}/posts/${postId}`)
      //filters out the post with the id matching the deleted ones
      //returns all post not matching the id in array
      setPosts(posts.filter(post => post.id !== postId));
    }catch (error) {
      console.log('Failed to delete post', error);
    }

  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      
    } catch (error) {

    }
  }
  //useEffect to use axios to fetch all blog posts on page load 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts`);
        setPosts(response.data)
      } catch (error) {
        console.log ('Error fetching posts', error)
      }

    }
    fetchPosts()

  }, [])
 
 

  return (

    <div >
      <h1>Blog Post</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
           <button type="submit" onClick={(()=>handleDelete(post.id))}>Delete</button>
          </li>
        ))}
      </ul>
      {/* posts? JSON.stringify(posts, null, 2 ) : "Loading..."}*/}
     <form  onSubmit={handleSubmit}>
      <input
      type='text'
      placeholder='Title'
      value={newPost.title}
      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
      />
      <textarea
      placeholder='Content'
      value={newPost.content}
      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
      />
      <button type='submit'>Add Post</button>
      </form>
    </div>
  );
}

export default App;
