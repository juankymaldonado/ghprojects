import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaBriefcase,
  FaPhoneSquare,
  FaWrench,
} from "react-icons/fa";

/************** NavBar ***********************/
// To display page buttons

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div></div>
      <div className="button-container">
        <button onClick={() => navigate("/")} className="circle-button">
          <FaUser size={50} color="gray" /> {/* About icon */}
        </button>
        <button onClick={() => navigate("/skills")} className="circle-button">
          <FaClipboardList size={50} color="gray" /> {/* Skills icon */}
        </button>
        <button
          onClick={() => navigate("/experience")}
          className="circle-button"
        >
          <FaBriefcase size={50} color="gray" /> {/* Experience icon */}
        </button>
        <button onClick={() => navigate("/contact")} className="circle-button">
          <FaPhoneSquare size={50} color="gray" /> {/* Contact icon */}
        </button>
        <button onClick={() => navigate("/login")} className="circle-button">
          <FaWrench size={50} color="gray" /> {/* Login icon */}
        </button>
      </div>
      <div className="footer">
        <p>
          This site was built using React, Node.js, MongoDB, Firebase and is
          hosted on Google Cloud.
        </p>
      </div>
    </div>
  );
};

export default NavBar;
