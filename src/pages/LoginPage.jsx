import NoLoginNoSearchBarHeader from "../components/NoLoginNoSearchBarHeader";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const goToLoginPage = () => {
    if (email === "newUser" && password === "newPassword") {
      navigate("/useraccount");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <main>
      <NoLoginNoSearchBarHeader />

      <div 
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "75vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          
          <h3 className="text-center mb-4">Login</h3>

          <div className="mb-3">
            <label className="form-label">
              Email <span className="text-muted">(type "newUser")</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password <span className="text-muted">(type "newPassword")</span>
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100 mb-3"
            onClick={goToLoginPage}
          >
            Login
          </button>

          <p className="text-center mb-2">Don’t have an account?</p>

          <button className="btn btn-outline-secondary w-100">
            Sign Up for Free
          </button>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default LoginPage;
