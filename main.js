function showForm() {
  document.getElementById("popupTaskForm").style.display = "block";
}
function hideForm() {
  document.getElementById("popupTaskForm").style.display = "none";
}

function getTask() {
  return JSON.parse(localStorage.getItem("list")) || [];
}

function saveTask(taskList) {
  localStorage.setItem("list", JSON.stringify(taskList));
}

const nowDate = new Date();
const today = nowDate.toISOString().slice(0, 16);
userDate = document.getElementById("taskDeadline").min = today;

// Add Task button
document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    // prevent default action when the form is being submit
    event.preventDefault();
    // get the task from local storage
    let taskList = getTask();
    console.log(taskList);

    const name = document.getElementById("taskName").value;
    const category = document.getElementById("taskCategory").value;
    const deadline = document.getElementById("taskDeadline").value;

    if (name.trim() !== "" && category.trim() !== "" && deadline.trim() !== "") {
      let newTask = {
        name: name,
        category: category,
        deadline: deadline,
        status: false,
      };
      // Hide form and reset the input value of the form
      hideForm();

      // Save to Task list array
      taskList.push(newTask);

      // Save to local storage
      saveTask(taskList);

      this.reset();
      showTaskContent();

      alert("Your Task Has Been Added!");
    } else {
      alert("The form must be complete!");
    }
  });

function takeDate(date) {
  const dtDate = new Date(date);
  const tDeadline = dtDate.toISOString().slice(0, 16).replace("T", " ");
  return tDeadline;
}

function showTaskContent() {
  const taskList = getTask();
  const table = document.getElementById("taskTable");
  document.getElementById("taskTable").innerHTML = "";
  // let taskList = getTask();
  for (var i = 0; i < taskList.length; i++) {
    let row = `<tr>
                    <td>${taskList[i].name}</td>
                    <td>${taskList[i].category}</td>
                    <td>${takeDate(taskList[i].deadline)}</td>
                    <td>${taskList[i].status === false ? "Pending" : "Done"}</td>
                </tr>`;
    table.innerHTML += row;
  }
}

showTaskContent();