const mongoose = require('mongoose');

const borrowbooksSchema = new mongoose.Schema({
    bookname:{
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
    },
    daysborrow:{
        type: String,
     },
     studentName:{
        type: String,
     },
     borrowed:{
      type: Object,
      required: true,
     },
     referenceCode:{
        type: String,
     },
     status:{
        type: String,
     }
},{
    timestamps: true,
})
const borrowbooksModel = mongoose.model('tbl_borrowbooks', borrowbooksSchema);
module.exports = borrowbooksModel;
