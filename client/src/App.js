import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:3001";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ id: 0, title: "", content: "", comments: [] });
  const [editingPost, setEditingPost] = useState(null);
 // const [idCounter, setIdCounter] = useState(1);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`);
      const updatedPosts = posts.filter((post) => post.id !== postId);
     setPosts(updatedPosts);
    } catch (error) {
      console.log('Failed to delete post', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   let postToAdd = { ...newPost, id: Date.now() };
    //setIdCounter((prevCounter) => prevCounter + 1);       // Increment the counter
    //setPosts([...posts, newPostWithId]);
    try {
      await axios.post(`${BASE_URL}/posts`, postToAdd);
      setPosts([...posts, postToAdd]);
      setNewPost({ id: 0, title: "", content: "", comments: [] });
    } catch (error) {
      console.log('Failed to create post', error);
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}`);
      setEditingPost(response.data);
    } catch (error) {
      console.log('Error fetching post for edit', error);
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/posts/${editingPost.id}`, editingPost);
      setPosts((prevPosts) => {
        return prevPosts.map((post) => (post.id === editingPost.id ? { ...editingPost } : post));
      });
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating the post', error);
    }
  };
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.log('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Post</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button type="button" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
            <button type="button" onClick={() => handleUpdatePost(post.id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>

      {editingPost && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Title"
            value={editingPost.title}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            value={editingPost.content}
            onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
          />
          <button type="submit">Update Post</button>
        </form>
      )}
    </div>
  );
}




export default App;
