import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../actions/thoughtActions";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";

class ThoughtPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    if (this.props.courses.length === 0) this.props.actions.loadCourses();
  }

  render() {
    return (
      <div>
        {this.state.redirectToAddCoursePage && <Redirect to="/thought" />}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <h2>Thoughtful thoughts</h2>
            <button
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Thoughtful thought
            </button>

            <CourseList courses={this.props.courses} />
          </>
        )}
      </div>
    );
  }
}

ThoughtPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    loading: state.ajaxCallsInProgress > 0
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
)(ThoughtPage);
