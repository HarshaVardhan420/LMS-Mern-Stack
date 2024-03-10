import Button from "react-bootstrap/Button";
import logo from "../assets/images/2072841.png";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {
  CDBBtn,
  CDBBox,
  CDBCard,
  CDBCardBody,
  CDBContainer,
} from "cdbreact";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from '../../App';

export default function Booklist() {
const [userData, setUserData] = useState("");
const [student, setStudent] = useState(false);

  const [data, setData] = useState([]);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "../../";
  };

//convert to base64 format
  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result); //base64encoded string  
        setImage(reader.result);
    };
    reader.onerror = error => {
        console.log("Error: ", error);
    };
}
//end convert to base64 format

 //get all books

 useEffect(() => {
    getAllBooks();
  }, []);


  //fetching all user
  const getAllBooks = async() => {
    await fetch(`${VITE_BACKEND_URL}/api/getAllBooks`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "bookData");
        setData(data.data);
      });
  };


 //end get all books

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/userData`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
        body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "student") {
            setStudent(true);
        }

        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "../";
        }
      });
  }, []);

  //reference code below 

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
  //end reference code below

///console.log(makeid(5));

const [bookname, setBookname] = useState("");
const [ISBNNumber, setISBNNumber] = useState("");
const [authorname, setAuthorname] = useState("");
const [publishername, setPublishername] = useState("");
const [publisheddate, setPublisheddate] = useState("");
const [quantity, setQuantity] = useState("");
const [daysborrow, setDaysborrow] = useState("");
const [studentName, setStudentname] = useState("");
const [studentid, setStudentId] = useState({});
const [referenceCode, setReferencecode] = useState("");

//add borrow book
const handleSubmit = async(e) => {
  e.preventDefault();

      const bookname = e.target[0].value
      console.log("=======bookname=======");
      console.log(bookname)

      const ISBNNumber = e.target[1].value
      console.log("=======ISBNNumber=======");
      console.log(ISBNNumber)

      const authorname = e.target[2].value
      console.log("=======authorname=======");
      console.log(authorname)

      const publishername = e.target[3].value
      console.log("=======publishername=======");
      console.log(publishername)

      const publisheddate = e.target[4].value
      console.log("=======publisheddate=======");
      console.log(publisheddate)

      const quantity = e.target[5].value
      console.log("=======quantity=======");
      console.log(quantity)

      const daysborrow = e.target[6].value
      console.log("=======daysborrow=======");
      console.log(daysborrow)

      const studentName = e.target[7].value
      console.log("=======studentName=======");
      console.log(studentName)

      const studentid = e.target[8].value
      console.log("=======studentid=======");
      console.log(studentid)

      const referenceCode = e.target[9].value
      console.log("=======referenceCode=======");
      console.log(referenceCode)

      e.preventDefault();
      await fetch(`${VITE_BACKEND_URL}/api/add-borrowbook`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          bookname,
          ISBNNumber,
          authorname,
          publishername,
          publisheddate,
          quantity,
          daysborrow,
          studentName,
          studentid,
          referenceCode
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("===============borrowbook-added================");
          // console.log(data, "borrowbook-added");
          if (data.status == "ok") {
            toast.success("Add borrow book successfully")
            setTimeout(() => {
                window.location.href = "/student/booklists?";
              }, 2000);
            
            getAllBooks();
          // }else if (data.status == "notok") {
          //   toast.warning("Book already exists")
          //   setTimeout(() => {
          //       window.location.href = "/student/booklists";
          //     }, 2000);
          // }
          } else {
            toast.error("Something went wrong")
          }
        });
    
    };

  //end add borrow book
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBBox display="flex" alignContent="start">
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit", fontSize: "40px" }}
            >
              <img
                src={logo}
                alt="logo picture"
                style={{ width: "50px", height: "50px" }}
              />{" "}
              LMS
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                exact
                to="/dashboard/dashboard"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/student/booklists" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="book">
                  <Link to="/student/booklists">Books</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/student/borrowedbooklists"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="book">
                  <Link to="/student/borrowedbooklists">Borrowed Books</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/admin/returnedbooks"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="book">
                  <Link to="/admin/returnedbooks">Returned Books</Link>
                </CDBSidebarMenuItem>
              </NavLink>
    
              <NavLink
                exact
                to="/admin/students"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="user">
                  <Link to="/admin/students">Profile</Link>
                </CDBSidebarMenuItem>
              </NavLink>
      

              <NavLink
                exact
                to="/hero404"
                target="_blank"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="arrow-right">
                  <Button variant="primary" onClick={logOut}>
                    Log out
                  </Button>
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBContainer></CDBContainer>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              Created by: Junil toledo
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </CDBBox>
      <CDBBox
        m="5"
        display="flex"
        justifyContent="center"
        style={{
          width: "100%",
          height: "200px",
        }}
      >
        <>
          <CDBContainer>
            <CDBCard>
              <>
              <InputGroup className="mb-3 mt-3" style={{ padding:'10px' }}>
                <Form.Control
                placeholder="Search Books.."
                aria-label="Recipient's username with two button addons"
                />
                <Button variant="outline-secondary"> <i className="fa fa-search"></i></Button>
            </InputGroup></>
              <CDBCardBody>

                {data.map((i) => {
                    return (
                      <>
                     <Row >
                      
                        <Col className="col-auto flex">
              
                          {i.image == "" || i.image == null ? <img width={150} height={150} src='https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg'  alt='default image' style={{ width:'60', height:'60' }}/> : <img width={150} height={150} src={i.image} className="img-size" />}
                      
                         <div className="flot">
                      
                           <h4 className="title-book">{i.bookname}</h4>
                             <p className="p-desc">
                                <b>ISBN Number:</b> {i.ISBNNumber}<br />
                                <b>Author Name:</b> {i.authorname}<br />
                                <b>Publisher Name:</b> {i.publishername}<br />
                                <b>Published Date:</b> {i.publisheddate}<br />
                                <b>Quantity:</b> {i.quantity}<br />
                              <Form onSubmit={handleSubmit}>
                                <input type="hidden" name="bookname" onChange={(e)=>setBookname({bookname, name: e.target.value})} value={i.bookname}/>
                                <input type="hidden" name="ISBNNumber" onChange={(e)=>setISBNNumber({ISBNNumber ,name: e.target.value})}  value={i.ISBNNumber}/>
                                <input type="hidden" name="authorname" onChange={(e)=>setAuthorname({authorname,name: e.target.value})}  value={i.authorname}/>
                                <input type="hidden" name="publishername" onChange={(e)=>setPublishername({publishername,name: e.target.value})} value={i.publishername}/>
                                <input type="hidden" name="publisheddate" onChange={(e)=>setPublisheddate({publisheddate,name: e.target.value})}  value={i.publisheddate}/>
                                <input type="hidden" name="quantity" onChange={(e)=>setQuantity({quantity,name: e.target.value})} value={i.quantity}/>
                                <b>How many days you borrow ?: </b><input type="number" name="daysborrow" onChange={(e) => setDaysborrow(e.target.value)} style={{ width: '50px' }} min={1} max={9999}/><br /><br />
                                <input type="hidden" name="studentName" onChange={(e)=>setStudentname({studentName,name: e.target.value})} value={userData.name}/>
                                <input type="hidden" name="studentid" onChange={(e)=>setStudentId({studentid,name: e.target.value})} value={userData._id}/>
                                <input type="hidden" name="referenceCode" onChange={(e)=>setReferencecode({referenceCode,name: e.target.value})} value={makeid(8)} />
                                <CDBBtn color="success" type="submit">Borrow Book</CDBBtn>
                              </Form>
                             </p>
                            
                         </div>
                        </Col>
                     </Row>

                    </>
                    );
                })}
       
              </CDBCardBody>
            </CDBCard>
          </CDBContainer>
        </>
  
     
      </CDBBox>
    </div>
  );
}
