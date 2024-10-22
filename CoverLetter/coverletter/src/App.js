import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Experience from "./Components/Experience";
import NavBar from "./Components/NavBar";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import NotFoundPage from "./Components/NotFoundPage";

const AppContent = () => {
  return (
    <>
      <div className="App">
        <div id="page-body">
          <div className="container">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
        <NavBar />
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
