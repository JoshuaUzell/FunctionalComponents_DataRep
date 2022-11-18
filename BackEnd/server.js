const express = require('express')
const app = express()
const port = 4000 //sets port to 4000


const cors = require('cors');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) //parses body of http request

//Allows access to data
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    //Connect to our mongodb database
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.wt3m9bl.mongodb.net/?retryWrites=true&w=majority');

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

//Tells program what to write to each individual document in the database
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    cover: String
});

//Writes the details of the bookSchema to a collection in the database
//In this case its 'My Books'
const bookModel = mongoose.model('My Books', bookSchema);

app.get('/', (req, res) => {
    res.send('Hello World!') //Sends out a message of hello world
})

//listens for post request coming in
app.post('/api/books', (req, res) => {
    console.log(req.body); //Taking the body of the book and shows the data in the book
    //Creates a new record
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })
    res.send('Data Recieved');
})

app.get('/api/books', (req, res) => {
    
    //Runs aysncronosly server side and finds all the records
    //Then sends back the data to client
    bookModel.find((error, data) => {
        res.json(data);
    })
})

//Reads a document/book by id from the database
app.get('/api/book/:id', (req, res) =>{
    console.log(req.params.id);

    //Finds a record by id and sends back the data
    bookModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
})

//Listens in on the port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

