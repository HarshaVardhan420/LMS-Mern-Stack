import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import logo from "./assets/images/2072841.png";
import { CDBBox, CDBContainer } from "cdbreact";
import { Link } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

export default function AdminHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "../../";
  };

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
              <NavLink exact to="/admin/damagecharge" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="address-book">
                  <Link to="/admin/damagecharge">Damage Charge</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/students" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user"><Link to="/admin/students">Students</Link></CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/admins" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user"><Link to="/admin/admins">Admin</Link></CDBSidebarMenuItem>
              </NavLink>
              {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">
                  Analytics
                </CDBSidebarMenuItem>
              </NavLink> */}

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
        <Card className="w-100">
          <Card.Body>
            <Card.Text className="textcard">
              <h1 className="top-adjust">
                <CDBSidebarMenuItem icon="user">
                  &nbsp;<b> Welcome!,</b> {userData.name}{" "}
                </CDBSidebarMenuItem>
              </h1>
            </Card.Text>
          </Card.Body>
        </Card>
      </CDBBox>
    </div>
  );
}
