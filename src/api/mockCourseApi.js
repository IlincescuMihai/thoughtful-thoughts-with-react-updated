import delay from "./delay";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
  {
    id: "react-big-picture",
    title: "Greatful that I still see well and I am ini a ok shape.",
    authorId: "IlincescuMihai",
    category: "Health",
    day: "14.12.2014"
  },
  {
    id: "react-creating-reusable-components",
    title:
      "That Ralu is carying about you and you are you get along so well with her",
    authorId: "cory-house",
    category: "Relationship",
    day: "14.12.2014"
  },
  {
    id: "javascript-development-environment",
    title: "That you're parents are ok and with no big health problems",
    authorId: "cory-house",
    category: "Carying for others",
    day: "14.12.2014"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
function generateId(course) {
  return replaceAll(course.title, " ", "-");
}

export function getAllCourses() {
  return new Promise(resolve => {
    setTimeout(() => resolve([...courses]), delay);
  });
}

export function saveCourse(course) {
  // clone to avoid mutating reference passed in.
  course = { ...course };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server-side validation
      const minCourseTitleLength = 2;
      if (course.title.length < minCourseTitleLength) {
        reject(`Title must be at least ${minCourseTitleLength} characters.`);
      }

      if (course.id) {
        const existingCourseIndex = courses.findIndex(a => a.id == course.id);
        courses.splice(existingCourseIndex, 1, course);
      } else {
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        course.id = generateId(course);
        course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        courses.push(course);
      }

      // Just return here, since cloning at the beginning of the function instead.
      resolve(course);
    }, delay);
  });
}

export function deleteCourse(courseId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const indexOfCourseToDelete = courses.findIndex(
        course => course.courseId == courseId
      );
      courses.splice(indexOfCourseToDelete, 1);
      resolve();
    }, delay);
  });
}
