import Button from "react-bootstrap/Button";
import logo from "../assets/images/2072841.png";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { toast } from "react-toastify";
import { CDBBtn, CDBBox, CDBCard, CDBCardBody, CDBContainer } from "cdbreact";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBBadge,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../App";
import MyForm from "react-bootstrap/Form";

export default function Borrowedbooks({ userType }) {
  const [data, setData] = useState([]);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "../../";
  };

  // const [id, setId] = useState("");

  //convert to base64 format
  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }
  //end convert to base64 format

  // add book
  const handleSubmit = async (e) => {
    if (userType == "admin") {
      e.preventDefault();
      alert("You are not Admin");
    } else {
      e.preventDefault();
      await fetch(`${VITE_BACKEND_URL}/api/add-book`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "Admin-added");
          if (data.status == "ok") {
            toast.success("Add book successfully");
            setTimeout(() => {
              window.location.href = "/admin/books";
            }, 2000);

            getAllBooks();
          } else {
            toast.error("Something went wrong");
          }
        });
    }
  };
  //end add book

  //get all books

  useEffect(() => {
    getAllBooks();
  }, []);

  //fetching all user
  const getAllBooks = async () => {
    await fetch(`${VITE_BACKEND_URL}/api/getAllBorrowedBooks`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "bookData");
        setData(data.data);
      });
  };

  //end get all books

  //edit modal
  const [smShow, setSmShow] = useState(false);
  //  const handleCloseedit = () => setShowedit(false);

  //end edit modal

  //deleting book
  const deleteborrowedBook = async (id) => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/api/delete-borrowedbook/${id}`);
      toast.success("Delete a Borrowed book successfully");
      getAllBooks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //end deleting book

  //get single borrowed book
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    status: "",
    id: "",
  });

  const getSingleborrowedBook = async (id, status) => {
    // alert(status)

    setIsLoading(true);
    try {
      await axios.get(
        `${VITE_BACKEND_URL}/api/get-singleborrowedbook/${(id, status)}`
      );
      setStatus({
        status: status,
        id: id,
      });
      getSingleborrowedBook();
      setIsLoading(false);

      if (data.status == "ok") {
        toast.success("get borrowed book successfully");
        setTimeout(() => {
          window.location.href = "/admin/borrowedbooks";
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleborrowedBook();
  }, []);

  //end single borrowed book

  //update borrowed book
  const updateBorrowedBook = async (e) => {
    if (userType == "admin") {
      e.preventDefault();
      alert("You are not Admin");
    } else {
      e.preventDefault();
      const id = e.target[0].value;
      const status = e.target[1].value;

      await fetch(`${VITE_BACKEND_URL}/api/updateborrowedbook/${id}`, {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "Update-book");
          if (data.status == "ok") {
            toast.success("Update borrowed book successfully");
            setTimeout(() => {
              window.location.href = "/admin/borrowedbooks";
            }, 2000);
            // getAllBooks();
          } else {
            toast.error("Something went wrong");
          }
        });
    }
  };

  //end update borrowed book

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
              <NavLink exact to="/admin/books" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="book">
                  <Link to="/admin/books">Books</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/admin/borrowedbooks"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="book">
                  <Link to="/admin/borrowedbooks">Borrowed Books</Link>
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
                to="/admin/damagecharge"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="address-book">
                  <Link to="/admin/damagecharge">Damage Charge</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/admin/students"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="user">
                  <Link to="/admin/students">Students</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/admins" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  <Link to="/admin/admins">Admin</Link>
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

                      <th>Action</th>
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
                            <td>
                              <div className="d-flex">
                                <div className="flex-1">
                                  <CDBBtn
                                    color="primary"
                                    onClick={() =>
                                      getSingleborrowedBook(i._id, i.status)
                                    }
                                  >
                                    <span
                                      onClick={() => setSmShow(true)}
                                      className="me-2"
                                    >
                                      Edit
                                    </span>
                                  </CDBBtn>
                                </div>
                                &nbsp;
                                <div className="flex-1">
                                  <CDBBtn
                                    color="danger"
                                    onClick={() =>
                                      deleteborrowedBook(i._id, i.bookname)
                                    }
                                  >
                                    Delete
                                  </CDBBtn>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </CDBCardBody>
            </CDBCard>
          </CDBContainer>
        </>
        {/* modal edit */}
        <>
          <CDBContainer>
            <Modal
              size="sm"
              show={smShow}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  <h5>Edit Borrowed Book</h5>
                </Modal.Title>
              </Modal.Header>
              <Form onSubmit={updateBorrowedBook}>
                <Modal.Body>
                  <input
                    type="text"
                    style={{ display: "none" }}
                    name="id"
                    onChange={(e) =>
                      setStatus({ ...status, name: e.target.value })
                    }
                    value={status.id}
                  />
                  <MyForm.Select
                    name="status"
                    value={status.status}
                    onChange={(e) =>
                      setStatus({ ...status, name: e.target.value })
                    }
                    aria-label="Default select example"
                  >
                    <option>&larr; Select Status &rarr;</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </MyForm.Select>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setSmShow(false)}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </CDBContainer>
        </>
        {/*end modal edit */}
      </CDBBox>
    </div>
  );
}
