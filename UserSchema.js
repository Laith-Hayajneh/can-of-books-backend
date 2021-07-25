'use strict';

const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
});

const UserSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema],
  });


  
const myBookModel = mongoose.model("Book", BookSchema);

const myUserModel = mongoose.model("User", UserSchema);









console.log('laith')

function seedUserCollection() {
  const books = new myUserModel({
    email: "laithhayajneh98@gmail.com",
    books: [
      {
        name: "The Growth Mindset",
        description:
          "Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.",
        status: "FAVORITE FIVE",
        img: "https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg",
      },
      {
        name: "The Momnt of Lift",
        description:
          "Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.",
        status: "RECOMMENDED TO ME",
        img: "https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg",
      },
    ],
  });
  books.save();
}

// seedUserCollection()

module.exports = myUserModel;