const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    bookname:{
    type: String,
   },
   booknumbercode:{
    type: String,
   },
   ISBNNumber:{
    type: String,
   },
   authorname:{
    type: String,
   },
   publishername:{
    type: String,
   },
   publisheddate: {
    type: String,
   },
   quantity:{
      type: String,
    },image:{
        type: String,
     }
}, {
    collection: 'tbl_books'
  },{
    timestamps: true,
})
const booksModel = mongoose.model('tbl_books', booksSchema);
module.exports = booksModel;
