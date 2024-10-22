import Form from "./Form";

/************** Contact page***********************/
// To my contact information to page guest

const Contact = () => (
  <div className="about-container">
    <h1>Juan Carlos Maldonado Berríos</h1>
    <h2>Barranquitas, P.R.</h2>
    <div className="contact-container">
      <ul>
        <li>
          <strong>Phone Number:</strong> 787-323-6501
          <br />
        </li>
        <li>
          <strong>Email: </strong>
          <a
            href="mailto:juanky2406@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            juanky2406@gmail.com
          </a>
        </li>
        <li>
          <strong>LinkedIn: </strong>
          <a
            href="https://www.linkedin.com/in/juan-carlos-maldonado-berrios-012015152"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Profile
          </a>
        </li>
      </ul>
    </div>
    <Form page="contact" />
  </div>
);

export default Contact;
