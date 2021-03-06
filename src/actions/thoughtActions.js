import * as courseApi from "../api/mockCourseApi";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_THOUGHTS_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_THOUGHTS_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_THOUGHT_SUCCESS, course };
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseApi
      .getAllCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
