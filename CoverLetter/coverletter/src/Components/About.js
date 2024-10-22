import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../imgs/img.png";
import Form from "./Form";
import useUser from "../Hooks/useUser";

/************** About page***********************/
// To show career brief and highlights

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const { user, isLoading } = useUser();

  //Use to load About Information
  useEffect(() => {
    const loadAboutInfo = async () => {
      const response = await axios.get("/api/about");
      const aboutsList = response.data;

      setAbouts(aboutsList);
    };

    loadAboutInfo();
  }, []);

  //Use to load Highlights
  useEffect(() => {
    const loadHighlightsInfo = async () => {
      const response = await axios.get("/api/highlights");
      const highlightsList = response.data;

      setHighlights(highlightsList);
    };

    loadHighlightsInfo();
  }, []);

  return (
    <div className="about-container">
      <div className="title-header">
        <div className="title-subHeader">
          <h1>Juan Carlos Maldonado Berríos</h1>
          <h2>Fullstack Developer Senior</h2>
        </div>
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="about-text">
        {abouts.map((about) => (
          <p>{about.description}</p>
        ))}
      </div>
      <div className="highlights-container">
        <h3>Highlights:</h3>
        {user && <Form page="about" />}
        <ul>
          {highlights.map((highlight) => (
            <li>
              <strong>{highlight.title}: </strong>
              {highlight.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
