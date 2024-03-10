const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    studentid:{
    type: String,
   },
   name:{
    type: String,

   },
   course:{
    type: String,
   },
   yearandsection:{
    type: String,
   },
   email: {
    type: String,
   },
   password:{
      type: String,
    },
    userType:{
        type: String,
        default: "student"
    }
},{
    timestamps: true,
})
const studentModel = mongoose.model('tbl_students', studentsSchema);
module.exports = studentModel;