import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosContact } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import ThemeToggleButton from "./ThemeToggleButton";

function Navbar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const notify = () => toast("Logged Out!");

  async function handleLogout() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/logout",
        null,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        notify();
        localStorage.removeItem("theme");
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg  p-0 ${
          theme === "dark" ? "navbar-dark bg-dark" : "navbar-dark bg-primary"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <h5>MyCollection</h5>
          </Link>
          <div className="d-flex align-items-center navFlex">
            <ThemeToggleButton />
            {user ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item dropdown profileNav">
                  <a
                    className="nav-link dropdown-toggle p-0 dropdown-toggle-split"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <IoIosContact
                      size={"50px"}
                      className={theme === "dark" ? "dark-svg" : "light-svg"}
                    />
                  </a>
                  <ul
                    className="dropdown-menu expandDiv dropdown-menu dropdown-menu-end"
                    id="dropDownWidth"
                  >
                    <li id="dropDownWidth">
                      <Link
                        className="dropdown-item"
                        id="dropDownWidth"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li id="dropDownWidth">
                      <hr />
                    </li>
                    <li id="dropDownWidth">
                      <Link
                        className="dropdown-item"
                        id="dropDownWidth"
                        to="/home"
                      >
                        Home
                      </Link>
                    </li>
                    <li id="dropDownWidth">
                      <hr />
                    </li>
                    <li id="dropDownWidth">
                      <Link
                        className="dropdown-item"
                        onClick={handleLogout}
                        id="dropDownWidth"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <>
                {location.pathname === "/" ? (
                  <button className="btn btn-success my-2">
                    <Link
                      className="dropdown-item"
                      to="/register"
                      id="dropDownWidth"
                    >
                      Register
                    </Link>
                  </button>
                ) : null}

                {location.pathname === "/register" ? (
                  <button className="btn btn-success my-2">
                    <Link className="dropdown-item" to="/" id="dropDownWidth">
                      Login
                    </Link>
                  </button>
                ) : null}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
