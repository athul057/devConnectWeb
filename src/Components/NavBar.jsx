import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../utils/cartSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeItem());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    user && (
      <nav className="navbar bg-base-300 shadow-md sticky top-0 z-10">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary">
            DevConnect
          </Link>
        </div>
        <div className="flex-none gap-4 items-center">
          <span className="hidden sm:block text-lg font-medium text-gray-700">
            Hello, {user.firstName}
          </span>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar transition hover:scale-110"
            >
              <div className="w-10 h-10 rounded-full border-2 border-primary">
                <img
                  alt="profile image"
                  src={user.photoUrl || "https://via.placeholder.com/150"}
                  className="object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge badge-accent">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">My Connections</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  );
};

export default NavBar;
