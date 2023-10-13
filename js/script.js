/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Define global variables
const itemsPerPage = 9;
const paginationContainer = document.querySelector(
  "div.pagination ul.link-list"
);
const studentList = document.querySelector("ul.student-list");
const headerContainer = document.querySelector("header");

/**
 * Creates student list items
 * @param list  array of student object
 * @param page  page number to show
 */
function showPage(list, page) {
  const startIndex = itemsPerPage * page - itemsPerPage;
  const endIndex = itemsPerPage * page - 1;
  studentList.innerHTML = "";

  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i <= endIndex) {
        const student = list[i];
        const studentHtml = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">
           <h3>${student.name.first} ${student.name.last}</h3>
           <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${student.registered.date}</span>
         </div>
       </li>`;
        studentList.insertAdjacentHTML("beforeend", studentHtml);
      }
    }
  } else {
    studentList.innerHTML = `<div class="no-results">No students found...</div>`;
  }
}

/**
 * Creates pagination buttons
 * @param list array of student object
 */
function addPagination(list) {
  paginationContainer.innerHTML = "";

  if (list.length > itemsPerPage) {
    const numberOfButtons = Math.ceil(list.length / itemsPerPage);

    for (let i = 1; i <= numberOfButtons; i++) {
      const buttonHtml = `<li>
      <button type="button">${i}</button>
    </li>`;
      paginationContainer.insertAdjacentHTML("beforeend", buttonHtml);
    }

    paginationContainer.querySelector("button").classList.add("active");

    paginationContainer.addEventListener("click", (e) => {
      const activeButton = paginationContainer.querySelector("button.active");
      if (e.target.nodeName === "BUTTON") {
        showPage(list, e.target.textContent);
        activeButton.classList.remove("active");
        e.target.classList.add("active");
      }
    });
  }
}

function createSeachControls() {
  const searchControls = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`;
  headerContainer.insertAdjacentHTML("beforeend", searchControls);
}

/**
 * Searches student by name
 */
function search() {
  const seachInput = document.querySelector("#search");
  const searchbutton = seachInput.parentNode.querySelector("button");
  const seachText = seachInput.value.trim().toLowerCase();
  const filteredData = data.filter((student) => {
    return (
      student.name.first.toLowerCase().includes(seachText) ||
      student.name.last.toLowerCase().includes(seachText)
    );
  });

  showPage(filteredData, 1);
  addPagination(filteredData);
}

function setSeachEventListeners() {
  const seachInput = document.querySelector("#search");
  const searchButton = seachInput.parentNode.querySelector("button");
  searchButton.addEventListener("click", search);
}

// Call functions on page load
createSeachControls();
setSeachEventListeners();
showPage(data, 1);
addPagination(data);
