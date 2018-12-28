import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Grateful for</th>
        <th>Category</th>
        <th>Day</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => (
        <tr key={course.id}>
          <td>
            <Link to={"/course/" + course.id}>{course.title}</Link>
          </td>
          <td>{course.category}</td>
          <td>{course.day}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseList;
