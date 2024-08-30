import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var blog = [];

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.ejs',
        {blog:blog}
    );
});

app.get('/get-blog-data/:id', (req, res) => {
    const itemID = parseInt(req.params.id, 10);

     // Find the item in the array
    const item = blog.find(i => i.id === itemID);

    // If item is found, send it as a response, otherwise send an error message
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
    
});

app.delete('/delete/:id', (req, res) => {
    const itemID = parseInt(req.params.id, 10);

    // Find the item to delete
    const itemIndex = blog.findIndex((item) => item.id === itemID);

    if (itemIndex !== -1) {
        // Remove item from the array
        blog.splice(itemIndex, 1);
        res.status(200).send(`Item with id ${itemID} deleted.`);
    } else {
        res.status(404).send('Item not found.');
    }
});

app.post('/submit', (req, res) => {
    blog.push({id: blog.length + 1, title:req.body['title'], content:req.body['content']});
    res.redirect('/feed');
});

app.post('/update', (req, res) => {
    const itemID = parseInt(req.body['id']);

    // Find the index of the user with the specified id
    const index = blog.findIndex(item => item.id === itemID);

    // If user is found, update their properties
    if (index !== -1) {
        // Merge existing user object with newData
        blog[index] = { ...blog[index], ...{title:req.body['update_title'], content:req.body['update_content']} };
        res.redirect('/feed');
    } else {
        console.log(`User with id ${itemID} not found.`);
    }

});

app.get('/feed', (req, res) => {
    res.render(__dirname + '/views/index.ejs',
        {blog:blog}
    );
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})