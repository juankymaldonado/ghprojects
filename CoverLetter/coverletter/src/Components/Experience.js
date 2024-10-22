import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import useUser from "../Hooks/useUser";

/************** Experience page***********************/
// To show career experience and education

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const { user, isLoading } = useUser();

  //Use to load experience data - It will be filtered by work and education
  useEffect(() => {
    const loadExperienceInfo = async () => {
      const response = await axios.get("/api/experiences");
      const experiencesList = response.data;

      setExperiences(experiencesList);
    };

    loadExperienceInfo();
  }, []);

  return (
    <>
      <div className="about-container">
        <div className="highlights-container2">
          <h3>Work Experience:</h3>
          {user && <Form page="experience" />}
          <ul>
            {experiences
              .filter((experience) => experience.type.toLowerCase() === "work")
              .map((experience) => (
                <li key={experience.id}>
                  <strong>
                    {experience.name} ({experience.date})
                  </strong>
                  <p>{experience.description}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className="highlights-container2">
          <h3>Education:</h3>
          <ul>
            {experiences
              .filter(
                (experience) => experience.type.toLowerCase() === "education"
              )
              .map((experience) => (
                <li key={experience.id}>
                  <strong>
                    {experience.name} ({experience.date})
                  </strong>
                  <p>{experience.description}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Experience;
