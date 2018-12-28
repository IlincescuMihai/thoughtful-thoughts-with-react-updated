import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Thoughtful thoughts.</h1>
        <h2>Get Started</h2>
        <ol>
          <li>
            Create <Link to="">an account </Link>
          </li>
          <li>
            Add an <Link to="thought">thoughtful thought</Link>
          </li>
        </ol>
      </div>
    );
  }
}

export default HomePage;
