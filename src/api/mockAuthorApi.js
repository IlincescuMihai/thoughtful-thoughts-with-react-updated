import delay from "./delay";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const authors = [
  {
    id: "cory-house",
    firstName: "Cory",
    lastName: "House"
  },
  {
    id: "scott-allen",
    firstName: "Scott",
    lastName: "Allen"
  },
  {
    id: "dan-wahlin",
    firstName: "Dan",
    lastName: "Wahlin"
  }
];

//This would be performed on the server in a real app. Just stubbing in.
function generateId(author) {
  return author.firstName.toLowerCase() + "-" + author.lastName.toLowerCase();
}

export function getAllAuthors() {
  return new Promise(resolve => setTimeout(() => resolve([...authors]), delay));
}

export function saveAuthor(author) {
  // clone to avoid mutating reference passed in.
  author = { ...author };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server-side validation
      const minAuthorNameLength = 1;
      if (author.firstName.length < minAuthorNameLength) {
        reject(
          `First Name must be at least ${minAuthorNameLength} characters.`
        );
      }

      if (author.id) {
        const existingAuthorIndex = authors.findIndex(a => a.id == author.id);
        authors.splice(existingAuthorIndex, 1, author);
      } else {
        //Just simulating creation here.
        //The server would generate ids for new authors in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        author.id = generateId(author);
        authors.push(author);
      }

      // Just return here, since cloning at the beginning of the function instead.
      resolve(author);
    }, delay);
  });
}

export function deleteAuthor(authorId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const indexOfAuthorToDelete = authors.findIndex(
        author => author.id == authorId
      );
      authors.splice(indexOfAuthorToDelete, 1);
      resolve();
    }, delay);
  });
}
