import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import useUser from "../Hooks/useUser";

/************** Login page***********************/
//To be able to login as administrator
//Is using firebase library for authentication purposes

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, isLoading } = useUser();

  const navigate = useNavigate();
  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(getAuth());
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="about-container">
        <div className="form-container">
          {user ? (
            <>
              <div className="header">
                <h3>LogOut</h3>
              </div>
              <button className="submit-btn" onClick={logOut}>
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="header">
                <h3>Login</h3>
              </div>
              {error && <p className="error">{error}</p>}
              <input
                className="input-field"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button className="submit-btn" onClick={logIn}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
