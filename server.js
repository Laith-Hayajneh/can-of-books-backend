"use strict";

const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UserSchema = require('./UserSchema')

server.use(cors());

const PORT = process.env.PORT;
server.use(express.json())

mongoose.connect(`${process.env.MONGODB}`, {
// mongoose.connect("mongodb://localhost:27017/book", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.get("/", (req, res) => {
  res.send("Home Route");
});

// server.get('/user', handleResponse)
server.get('/books', handleBookResponse)
server.post('/books', addBookResponse)


function addBookResponse(req, res) {
  console.log('this req.body ', req.body)
  let { bookName, bookDesc, bookStatus } = req.body;
  let emailAddress = req.query.email
  console.log('this email address from add book ,,,,', emailAddress)

  UserSchema.find({ email: emailAddress }, (error, userdata) => {
    if (error) { res.send('cant find user') }
    else {
      console.log('before adding', userdata)
      userdata[0].books.push({
        name: bookName,
        description: bookDesc,
        status: bookStatus
      })
      console.log('after adding', userdata[0])
      userdata[0].save()
      res.send(userdata[0].books)
    }
  })

}

// server.get('/books', handleBookResponse)
// localhost:3001/deleteCat/1?ownerName=razan
server.delete('/books/:id', deleteBookHandler)
// server.delete('/books/:id', deleteBooksHandler)

function deleteBookHandler(req, res) {
  // console.log('deeeeeee ');
  console.log('this is req.query', req.query)

  // let bookId = Number(req.params.id);
  let bookId = req.params.id;
  console.log('this is bookId', bookId)
  // console.log('this is req.params.bookId',req.params.bookId);

  let emailAddress = req.query.email
  console.log('this is email address', emailAddress)

  UserSchema.find({ email: emailAddress }, (error, userdata) => {
    if (error) { res.send('cant find user') }
    else {
      //  console.log('before deleting',userdata[0].books)

      let newBooksArr = userdata[0].books.filter(idx => {
        //  if(idx !== index) {return book}
        console.log('ppppppppp', idx._id);

        return idx._id.toString() !== bookId
      })
      userdata[0].books = newBooksArr
      //  console.log('newbooks array',newBooksArr)
      //  console.log('after deleting',userdata[0].books)
      userdata[0].save();
      res.send(userdata[0].books)
    }

  })
}




server.put('/books/:id', updateBooksHandler)


function updateBooksHandler(request, response) {

  let id = request.params.id;

  let { email, bookName, bookDescription, bookStatus } = request.body;
  console.log(request.body)
  UserSchema.findOne({ email: email }, (error, userdata) => {
    if (error) {
      response.status(500).send('NOT FOUND')
    }
    else {

      userdata.books.map(book => {


        if (book._id.toString() === id) {

          book.name = bookName;
          book.description = bookDescription;
          book.status = bookStatus;


          return book;
        }
        else {
          return book;
        }
      })

      userdata.save();

      response.status(200).send(userdata.books);

    }

  })
}





















//http://localhost:3001/user?email=osqadoomy@gmail.com
function handleResponse(req, res) {
  let emailAddress = req.query.email
  UserSchema.find({ email: emailAddress }, function (error, userdata) {
    if (error) {
      res.send(error)
    } else {
      res.send(userdata[0].email)
    }
  })
}


// http://localhost:3001/books?email=osqadoomy@gmail.com
function handleBookResponse(req, res) {
  let emailAddress = req.query.email
  UserSchema.find({ email: emailAddress }, function (error, userdata) {
    if (error) {
      res.send(error)
    } else {
      res.send(userdata[0].books)
    }
  })
}



// const bookName = new myUserModel({name: "hello"})
// console.log(bookName)


//   books.save();
// console.log(books)
// seedUserCollection();

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
