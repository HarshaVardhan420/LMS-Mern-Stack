require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/databaseConnection");
const studentModel = require("./models/studentModel");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const booksModel = require("./models/bookModel");
const borrowbooksModel = require("./models/borrowbookModel");

const  author  = require("./models/author");
const books = require("./models/book");

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND = process.env.FRONTEND;
const PORT = process.env.PORT || 3000;

var corsOptions = {
  origin: FRONTEND, //multiple access ['http://example.com', 'www.facebook.com']
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/register", async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new studentModel(req.body);
    const student = await newuser.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500);
    // throw new Error(error.message);
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await studentModel.find();
    res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: "Unable to get students" });
    // throw new Error(error.message);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await studentModel.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
      // expiresIn: "1hr",
      //expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "notlogin" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/api/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    studentModel
      .findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.get("/api/getAllUser", async (req, res) => {
  try {
    const allUser = await studentModel.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/getAllBooks", async (req, res) => {
  try {
    const allBooks = await booksModel.find({});
    res.send({ status: "ok", data: allBooks });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/add-book", async (req, res) => {
  const {
    bookname,
    booknumbercode,
    ISBNNumber,
    authorname,
    publishername,
    publisheddate,
    quantity,
    base64,
  } = req.body;
  try {
    await booksModel.create({
      bookname,
      booknumbercode,
      ISBNNumber,
      authorname,
      publishername,
      publisheddate,
      quantity,
      image: base64
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});


app.delete("/api/delete-book/:id", async (req, res) => {
  try {
     const {id} = req.params;
     const book = await booksModel.findByIdAndDelete(id);
     if(!book){
      res.status(404)
      throw new Error(`cannot find any book with ID ${id}`) 
     } 
     res.status(200).json(book);
    } catch (error) {
      res.status(500)
      throw new Error(error.message)
  }
})

app.get("/api/get-singlebook/:id", async (req, res) => {
  try {
     const {id} = req.body;
     const book = await booksModel.findOne(id);
     if(!book){
      res.status(404)
      throw new Error(`cannot find any book with ID ${id}`) 
     } 
     res.status(200).json(book);
  } catch (error) {
      res.status(500)
      throw new Error(error.message)
  //    res.status(500).json({message: error.message}) 
  }
});


app.put("/api/updatebook/:id", async (req, res) => {
  try {
     const {id} = req.params;
     const books = await booksModel.findByIdAndUpdate(id, req.body);
     if(!books){
      res.status(404)
      throw new Error(`cannot find any product with ID ${id}`) 

     } 
     await booksModel.findById(id);
     res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
})


//borrow books

app.post("/api/add-borrowbook", async (req, res) => {
  const {
    bookname,
    ISBNNumber,
    authorname,
    publishername,
    publisheddate,
    quantity,
    daysborrow,
    studentName,
    studentid,
    referenceCode,
    status

  } = req.body;
  // const bookExists = await borrowbooksModel.findOne({ bookname: bookname });
  // if (bookExists) {
  //   return res
  //     .status(200)
  //     .send({ status: "notok" });
  // }
  try {
    await borrowbooksModel.create({
      bookname,
      ISBNNumber,
      authorname,
      publishername,
      publisheddate,
      quantity,
      daysborrow,
      studentName,
      borrowed:{
        _id: studentid,
        bookname: bookname,
        ISBNNumber: ISBNNumber,
        authorname: authorname,
        publishername: publishername,
        publisheddate: publisheddate,
        quantity: quantity,
        daysborrow: daysborrow,
        studentName: studentName,

      },
      referenceCode,
      status: "pending",

    });
    
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.get("/api/getAllBorrowedBooks", async (req, res) => {
  try {
    const allborrowedBooks = await borrowbooksModel.find({});
    res.send({ status: "ok", data: allborrowedBooks });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/delete-borrowedbook/:id", async (req, res) => {
  try {
     const {id} = req.params;
     const borrowedbook = await borrowbooksModel.findByIdAndDelete(id);
     if(!borrowedbook){
      res.status(404)
      throw new Error(`cannot find any borrowed book with ID ${id}`) 
     } 
     res.status(200).json(borrowedbook);
    } catch (error) {
      res.status(500)
      throw new Error(error.message)
  }
})

app.get("/api/get-singleborrowedbook/:id", async (req, res) => {
  try {
     const {id} = req.body;
     const bbook = await borrowbooksModel.findOne(id);
     if(!bbook){
      res.status(404)
      throw new Error(`cannot find any borrowed book with ID ${id}`) 
     } 
     res.status(200).json(bbook);
  } catch (error) {
      res.status(500)
      throw new Error(error.message)
  //    res.status(500).json({message: error.message}) 
  }
});

app.put("/api/updateborrowedbook/:id", async (req, res) => {
  try {
     const {id} = req.params;
     const bbooks = await borrowbooksModel.findByIdAndUpdate(id, req.body);
     if(!bbooks){
      res.status(404)
      throw new Error(`cannot find any borrowed book with ID ${id}`) 

     } 
     await borrowbooksModel.findById(id);
     res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
})


//end borrowed books

//studen borrow book

app.get("/api/borrowedbooklists/:id", async (req, res) => {
  try {
    const id  = "6531779949714d336c9f1271";
    //  const studentid = await studentModel.findById({_id: id})
     const books = await borrowbooksModel.find({});
      res.status(200).send({
      message: "Get borrow books fetch successfully",
      success: true,
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error borrow book info", success: false, error });
  }
});



///////////////////////testing api joining////////////////////////////

app.post("/api/author", async (req, res) => {
  try {
    const {name, email} = req.body;
    const auth = await author.create({
      name,
      email
    });
    
    res.status(200).send(auth);
  } catch (error) {
    res
    .status(500)
    .send({ message: "Error author info", success: false, error });
  }
});


app.post("/api/book", async (req, res) => {
  try {
    const {name, email} = req.body;
    const book = await books.create({
      author_id: req.body.author_id,
      title: req.body.title,

    });
    const rightjoin = await book.save();
    
    res.status(200).send(rightjoin);
  } catch (error) {
    res
    .status(500)
    .send({ message: "Error author info", success: false, error });
  }
});

app.post("/api/authorbookpopulate", async (req, res) => {
  try {
    const abook = await books.find({_id: req.body.right_id}).populate('author_id');

    res.status(200).send(abook);
  } catch (error) {
    res
    .status(500)
    .send({ message: "Error author info", success: false, error });
  }
});




app.use(errorMiddleware);

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
