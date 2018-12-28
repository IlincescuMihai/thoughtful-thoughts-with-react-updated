import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../actions/thoughtActions";
import CourseList from "./CourseList";

function CoursesPage({ courses, actions }) {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) actions.loadCourses();
  }, []);

  return (
    <div>
      {redirectToAddCoursePage && <Redirect to="/thought" />}
      <h2>Thoughtful thoughts</h2>

      <button
        className="btn btn-primary add-course"
        onClick={() => setRedirectToAddCoursePage(true)}
      >
        Add Thoughtful thought
      </button>

      <CourseList courses={courses} />
    </div>
  );
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
