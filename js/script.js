/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const itemsPerPage = 9;
const paginationContainer = document.querySelector(
  "div.pagination ul.link-list"
);
const studentList = document.querySelector("ul.student-list");

const seachInput = document.querySelector("#search");
const searchbutton = seachInput.parentNode.querySelector("button");

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const numberOfButtons = Math.ceil(list.length / itemsPerPage);

  paginationContainer.innerHTML = "";

  if (list.length > itemsPerPage) {
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

function search() {
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

searchbutton.addEventListener("click", search);
seachInput.addEventListener("keyup", search);

// Call functions
showPage(data, 1);
addPagination(data);
