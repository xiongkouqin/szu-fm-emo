import React, {useState} from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../../redux/actionCreators/authActionCreators";
import "./main-content.css"
import Sidebar from "../Sidebar/index.jsx";

const NavDashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  const logout = () => {
    dispatch(logoutUser());
  };
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); // 切换侧边栏显示状态
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      variant="light"
      className="border-bottom py-3 shadow-sm"
    >
      <div className={`main-content ${showSidebar ? 'sidebar-open' : ''}`} >
      <Button variant="dark" onClick={toggleSidebar} style={{ marginLeft: "15px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </Button>
        {showSidebar && <Sidebar isOpen={showSidebar }/>}
      </div>
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ marginLeft: "25px", marginRight: "auto" }}
      >
        File Management System
      </Navbar.Brand>
      <Nav style={{ marginRight: "60px" }}>
        {isLoggedIn ? (
          <>

            <Nav.Link
              className="d-flex align-items-center justify-content-between"
              style={{ pointerEvents: "unset", cursor: "text" }}
            >
              Welcome,
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{marginRight: "10px", marginLeft: "-10px" }}
              className="text-dark"
              to="/dashboard/profile"
            >
              <strong>{user.data.displayName}</strong>
            </Nav.Link>
            {/*<Nav.Link*/}
            {/*  as={Button}*/}
            {/*  // variant="success"*/}
            {/*  variant="primary"*/}
            {/*  active*/}
            {/*  style={{ marginRight: "5px" }}*/}
            {/*  size="sm"*/}
            {/*  onClick={() => history.push("/")}*/}
            {/*  className="text-white"*/}
            {/*>*/}
            {/*  Home*/}
            {/*</Nav.Link>*/}
            <Nav.Link
                as={Button}
                variant="dark" // 使用 "primary" 变体，但我们将覆盖其样式
                active
                style={{
                  marginRight: "10px",
                  backgroundColor: "white", // 设置背景色为白色
                  borderColor: "blue", // 设置边框颜色为蓝色
                  color: "#000000", // 设置文字颜色为蓝色
                  borderWidth: "6px", // 设置边框宽度为3px，可以根据需要调整
                  borderStyle: "solid" // 设置边框样式为实线
                }}
                size="sm"
                onClick={() => history.push("/")}
                className="border" // 添加边框类，但这里的类实际上不是必须的，因为我们已经在style中定义了边框样式
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Button}
              variant="dark"
              active
              style={{ marginRight: "5px" }}
              size="sm"
              onClick={() => logout()}
              className="text-white"
            >
               Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link active style={{ marginRight: "5px" }} size="sm">
              Loading...
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavDashboard;
