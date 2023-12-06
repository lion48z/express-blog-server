const express = require('express');
const cors = require('cors');

const app = express();
//enable cors
app.use(cors())
app.use((req, res, next) =>{
    console.log(`${req.method} request was sent to  ${req.url}`);
    next();
})

app.use(express.json());  // next is implied in parse json

//middleware for parsing JSON responses
// middlware for logging the requesst
let blogPosts = [
    {id: 1, title: "First Post", content: "Why I Love Black Cats." , comments:[]},
    {id: 2, title: "Second Post", content: "How to Solve a Rubik's Cube Under a Minute." , comments:[]},
    {id: 3, title: "Third Post", content: "Eevee the Best Pokemon." , comments:[]}
]

//CRUD functionality Create, Read, Update, Delete
//read GET request route handler to return all blog posts
app.get('/posts', (req, res) => {
    res.json(blogPosts)
}
)
// router handler for fetching post by id 
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = blogPosts.find(post => post.id === Number(id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).send("Post not found");
    }
});
// create home page 
app.get('/', (req, res) => {
    res.json('Welcome to My Blog')  // for sending back text res.json to help finding posts 
})
// create Post request route handler to create a new blog post

app.post('/posts', (req, res) => {
    //create a new blog post Object
    //id current time when request received ...req.body will contain title and content 
    const newPost = { ...req.body}
    blogPosts.push(newPost);
    res.status(201).json(newPost); // send back blog post as json object 
    //along with a status code indicating success 
})

  

// update put request route handler fo r updating 
app.put('/posts/:id',(req, res)=>{
    // extract id from params object using destructuring
    const { id } = req.params;
    //const postId = parseInt(id, 10);
     //find the index of the blog post in the blogPosts arra with matching id
     let index = blogPosts.findIndex(post => post.id === Number(id));
     if (index !== -1){
        //update the blog post at that index with the new information
        //the blog post at the index should be update to be a new object 
        //with the same data as the original blog post with the new data 
        //overwriting the old data
        blogPosts[index] = {...blogPosts[index], ...req.body}
        res.json(blogPosts[index]); // send back updated blog posts
     }else {
        //if blog post with matching id not found send 404 status
        res.status(404).send("Post not found");
     }
})
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    //use filter method if blog post does not match id param it stays
    //if if matches it gets filtered out of the array
    blogPosts = blogPosts.filter(blogPost => blogPost.id !== Number(id) )
    res.status(204).send()
})
// start express server at Port 3000
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
