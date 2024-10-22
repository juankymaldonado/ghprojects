import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import useUser from "../Hooks/useUser";

/************** Skills Page***********************/
// To show career skills

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const { user, isLoading } = useUser();

  //Use to load all skills to show on a grid
  useEffect(() => {
    const loadSkillsInfo = async () => {
      const response = await axios.get("/api/skills");
      const skillsList = response.data;

      setSkills(skillsList);
    };

    loadSkillsInfo();
  }, []);

  return (
    <div>
      <h1>Acquired Skills During My Career</h1>
      <p>
        Throughout my career, I have acquired skills in project management,
        software development, and team leadership.
      </p>
      {user && (
        <div className="about-container">
          <Form page="skill" />
        </div>
      )}
      <div className="grid-page">
        <div className="grid-container">
          {skills.map((skill) => (
            <button className="circle-button2" key={skill.id}>
              {skill.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
