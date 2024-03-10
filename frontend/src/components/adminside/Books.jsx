import Button from "react-bootstrap/Button";
import logo from "../assets/images/2072841.png";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
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
} from "cdbreact";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../App";

export default function Books({ userType }) {
  const [data, setData] = useState([]);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "../../";
  };

  const [bookname, setBookname] = useState("");
  const [booknumbercode, setBooknumbercode] = useState("");
  const [ISBNNumber, setISBNNumber] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [publishername, setPublishername] = useState("");
  const [publisheddate, setPublisheddate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
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
      //   console.log(bookname, booknumbercode, ISBNNumber, authorname, publishername, publisheddate, quantity);
      await fetch(`${VITE_BACKEND_URL}/api/add-book`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          bookname,
          booknumbercode,
          ISBNNumber,
          authorname,
          publishername,
          publisheddate,
          quantity,
          base64: image,
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

  //add modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //end add modal

  //edit modal
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = () => setShowedit(true);
  //end edit modal

  //deleting book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/api/delete-book/${id}`);
      toast.success("Delete a book successfully");
      getAllBooks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //end deleting book

  //get single book
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    bookname: "",
    booknumbercode: "",
    ISBNNumber: "",
    authorname: "",
    publishername: "",
    publisheddate: "",
    quantity: "",
    id: "",
  });

  const getSinglBook = async (
    id,
    bookname,
    booknumbercode,
    ISBNNumber,
    authorname,
    publishername,
    publisheddate,
    quantity
  ) => {
    setIsLoading(true);
    try {
      await axios.get(
        `${VITE_BACKEND_URL}/api/get-singlebook/${
          (id,
          bookname,
          booknumbercode,
          ISBNNumber,
          authorname,
          publishername,
          publisheddate,
          quantity)
        }`
      );
      setBook({
        bookname: bookname,
        booknumbercode: booknumbercode,
        ISBNNumber: ISBNNumber,
        authorname: authorname,
        publishername: publishername,
        publisheddate: publisheddate,
        quantity: quantity,
        id: id,
        // image: response.data.image,
      });
      getSinglBook();
      setIsLoading(false);

      if (data.status == "ok") {
        toast.success("get book successfully");
        setTimeout(() => {
          window.location.href = "/admin/books";
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSinglBook();
  }, []);

  //end single book

  const updateBook = async (e) => {
    if (userType == "admin") {
      e.preventDefault();
      alert("You are not Admin");
    } else {
      e.preventDefault();
      const id = e.target[0].value;
      const bookname = e.target[1].value;
      const booknumbercode = e.target[2].value;
      const ISBNNumber = e.target[3].value;
      const authorname = e.target[4].value;
      const publishername = e.target[5].value;
      const publisheddate = e.target[6].value;
      const quantity = e.target[7].value;

      await fetch(`${VITE_BACKEND_URL}/api/updatebook/${id}`, {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          bookname,
          booknumbercode,
          ISBNNumber,
          authorname,
          publishername,
          publisheddate,
          quantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "Update-book");
          if (data.status == "ok") {
            toast.success("Update book successfully");
            setTimeout(() => {
              window.location.href = "/admin/books";
            }, 2000);
            // getAllBooks();
          } else {
            toast.error("Something went wrong");
          }
        });
    }
  };

  //end update book

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
              <CDBBtn
                color="success"
                onClick={handleShow}
                className="my-2"
                style={{ marginLeft: "10px" }}
              >
                Add Book
              </CDBBtn>
              <CDBCardBody>
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>Image</td>
                      <th>Book Name</th>
                      <th>Book Number</th>
                      <th>ISBN Number</th>
                      <th>Author Name</th>
                      <th>Publisher Name</th>
                      <th>Published Date</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((i, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              {i.image == "" || i.image == null ? (
                                <img
                                  width={60}
                                  height={60}
                                  src="https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"
                                  alt="default image"
                                  style={{ width: "60", height: "60" }}
                                />
                              ) : (
                                <img width={60} height={60} src={i.image} />
                              )}
                            </td>
                            <td>{i.bookname}</td>
                            <td>{i.booknumbercode}</td>
                            <td>{i.ISBNNumber}</td>
                            <td>{i.authorname}</td>
                            <td>{i.publishername}</td>
                            <td>{i.publisheddate}</td>
                            <td>{i.quantity}</td>
                            <td>
                              <div className="d-flex">
                                <div className="flex-1">
                                  <CDBBtn
                                    color="primary"
                                    onClick={() =>
                                      getSinglBook(
                                        i._id,
                                        i.bookname,
                                        i.booknumbercode,
                                        i.ISBNNumber,
                                        i.authorname,
                                        i.publishername,
                                        i.publisheddate,
                                        i.quantity
                                      )
                                    }
                                  >
                                    <span onClick={handleShowedit}>Edit</span>
                                  </CDBBtn>
                                </div>
                                &nbsp;
                                <div className="flex-1">
                                  <CDBBtn
                                    color="danger"
                                    onClick={() =>
                                      deleteBook(i._id, i.bookname)
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
        {/* modal add */}
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>New Book</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Book Name:</Form.Label>
                      <Form.Control
                        type="text"
                        name="bookname"
                        onChange={(e) => setBookname(e.target.value)}
                        placeholder="Enter Book Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Book Number/Code:</Form.Label>
                      <Form.Control
                        type="text"
                        name="booknumbercode"
                        onChange={(e) => setBooknumbercode(e.target.value)}
                        placeholder="Enter Number or Code"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>ISBN Number:</Form.Label>
                      <Form.Control
                        type="text"
                        name="ISBNNumber"
                        onChange={(e) => setISBNNumber(e.target.value)}
                        placeholder="Enter ISBN Number"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Author Name:</Form.Label>
                      <Form.Control
                        type="text"
                        name="authorname"
                        onChange={(e) => setAuthorname(e.target.value)}
                        placeholder="Enter Author Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Publisher Name:</Form.Label>
                      <Form.Control
                        type="text"
                        name="publishername"
                        onChange={(e) => setPublishername(e.target.value)}
                        placeholder="Enter Publisher Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Date Published:</Form.Label>
                      <Form.Control
                        type="date"
                        name="publisheddate"
                        onChange={(e) => setPublisheddate(e.target.value)}
                        placeholder="Enter Date Published"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter Quantity"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Upload Book Image:</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        name="publisheddate"
                        onChange={covertToBase64}
                        placeholder="Enter Date Published"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
        {/*end modal add */}

        {/* modal edit */}
        <>
          <Modal
            show={showedit}
            onHide={handleCloseedit}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Form onSubmit={updateBook}>
              <Modal.Body>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Book Name:</Form.Label>
                      <input
                        type="text"
                        style={{ display: "none" }}
                        name="id"
                        onChange={(e) =>
                          setBook({ ...book, name: e.target.value })
                        }
                        value={book.id}
                      />
                      <Form.Control
                        type="text"
                        value={book.bookname}
                        onChange={(e) =>
                          setBook({ ...book, name: e.target.value })
                        }
                        placeholder="Enter Book Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Book Number/Code:</Form.Label>
                      <Form.Control
                        type="text"
                        value={book.booknumbercode}
                        onChange={(e) =>
                          setBook({ ...book, name: e.target.value })
                        }
                        placeholder="Enter Number or Code"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>ISBN Number:</Form.Label>
                      <Form.Control
                        type="text"
                        value={book.ISBNNumber}
                        onChange={(e) =>
                          setBook({ ...book, name: e.target.value })
                        }
                        placeholder="Enter ISBN Number"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Author Name:</Form.Label>
                      <Form.Control
                        type="text"
                        value={book.authorname}
                        onChange={(e) =>
                          setBook({ ...book, name: e.target.value })
                        }
                        placeholder="Enter Author Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Publisher Name:</Form.Label>
                      <Form.Control
                        type="text"
                        value={book.publishername}
                        onChange={(e) =>
                          setBook({ ...book, name: e.target.value })
                        }
                        placeholder="Enter Publisher Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Date Published:</Form.Label>
                      <Form.Control
                        type="date"
                        value={book.publisheddate}
                        onChange={(e) =>
                          setBook({ ...book, name: e.target.value })
                        }
                        placeholder="Enter Date Published"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Control
                        type="number"
                        value={book.quantity}
                        onChange={(e) =>
                          setBook({ ...book, name: e.target.value })
                        }
                        placeholder="Enter Quantity"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseedit}>
                  Close
                </Button>

                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
        {/*end modal edit */}
      </CDBBox>
    </div>
  );
}
