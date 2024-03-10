import Button from "react-bootstrap/Button";
import logo from "../assets/images/2072841.png";
import { useEffect, useState } from "react";
import {  CDBBox, CDBCard, CDBCardBody, CDBContainer } from "cdbreact";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { VITE_BACKEND_URL } from "../../App";
import Badge from "react-bootstrap/esm/Badge";
import axios from "axios";

export default function Borrowedbookstudent() {


  const [data, setData] = useState([]);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "../../";
  };

  //get all books
  //const [isLoading, setIsLoading] = useState(false);
  //fetching all books
  // const getAllBooks = async () => {
  //   const studentid = "6531779949714d336c9f1271";
  //   await fetch(`${VITE_BACKEND_URL}/api/getStudentonlyBorrowedBooks/${studentid}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data, "==========bookData==========");
  //       console.log(data);
  //       setData(data.data);
          
  //     });
  // };


  const [userData, setUserData] = useState("");
  const [student, setStudent] = useState(false);
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

      });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  function getId(){
    var values = "6531779949714d336c9f1271";
    return values;
  }
const getAllBooks = async() =>{
    try {
      const id = getId();
        setIsLoading(true);
          const response = await axios.get(`${VITE_BACKEND_URL}/api/borrowedbooklists/${id}`)
          setIsLoading(false);
          if(response.data.success){
            setData(response.data.data)
          }
          console.log("================response==============");
          console.log(response);
      } catch (error) {
        setIsLoading(false);
      }
    
    }
    
  useEffect(() => {
    getAllBooks();
  }, []);

  //end get all books

  // useEffect(() => {
  //   const studentid = "6531779949714d336c9f1271";
  //   axios.get(`${VITE_BACKEND_URL}/api/getStudentonlyBorrowedBooks/${studentid}`)
  //     .then((res) => {
  //       setUserForm({
  //         name: res.data.data.name,
  //         email: res.data.data.email,
  //         rollno: res.data.data.rollno,
  //       });
  //     });
  // }, []);

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
          width: "100rem",
          height: "200px",
        }}
      >
        <>
          <CDBContainer>
            <CDBCard>
              <CDBCardBody>
               {userData._id && (
                <Table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>ISBN Number</th>
                    <th>Author Name</th>
                    <th>Publisher Name</th>
                    <th>Published Date</th>
                    <th>Quantity</th>
                    <th>Days borrowed</th>
                    <th>Student Name</th>
                    <th>Reference Code</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((i, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>{i.bookname}</td>
                          <td>{i.ISBNNumber}</td>
                          <td>{i.authorname}</td>
                          <td>{i.publishername}</td>
                          <td>{i.publisheddate}</td>
                          <td>{i.quantity}</td>
                          <td>{i.daysborrow}</td>
                          <td>{i.studentName}</td>
                          <td>{i.referenceCode}</td>
                          <td>
                            {i.status === "pending" ? (
                              <Badge bg="warning">Pending</Badge>
                            ) : (
                              <Badge bg="success">Approved</Badge>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
               )}
     
              </CDBCardBody>
            </CDBCard>
          </CDBContainer>
        </>
      </CDBBox>
    </div>
  );
}
