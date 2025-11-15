// HTML ELEMENTS
const addBtn = document.getElementById("addBtn");
const addTaskBtn = document.getElementById("addtaskbtn");
const cancelBtn = document.getElementById("cancelBtn");

const container = document.getElementById("main-container");
const taskContainer = document.getElementById("task-container");

const taskInput = document.getElementById("taskinput");
const descInput = document.getElementById("description");

const taskList = document.getElementById("tasklist");

let editIndex = null; // to track which task is being edited


// ------------------------------
// SHOW ADD TASK FORM
// ------------------------------
addBtn.addEventListener("click", () => {
    editIndex = null; // not editing
    taskInput.value = "";
    descInput.value = "";

    container.style.display = "none";
    taskContainer.style.display = "flex";

    addTaskBtn.innerText = "Add Task";
});


// ------------------------------
// CANCEL BUTTON
// ------------------------------
cancelBtn.addEventListener("click", () => {
    taskContainer.style.display = "none";
    container.style.display = "block";
});


// ------------------------------
// ADD or EDIT TASK
// ------------------------------
addTaskBtn.addEventListener("click", () => {

    const name = taskInput.value.trim();
    const desc = descInput.value.trim();

    if (!name || !desc) {
        alert("Please enter both task name and description!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (editIndex === null) {
        // ---------------- ADD NEW TASK ----------------
        tasks.push({
            name: name,
            description: desc
        });
    } else {
        // ---------------- EDIT EXISTING TASK ----------------
        tasks[editIndex].name = name;
        tasks[editIndex].description = desc;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    // reset fields
    taskInput.value = "";
    descInput.value = "";

    taskContainer.style.display = "none";
    container.style.display = "block";

    displayTasks();
});


// ------------------------------
// DISPLAY TASKS
// ------------------------------
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        li.innerHTML = `
            <div class="text-container">
                <h3>${task.name}</h3>
            </div>

            <div class="actions">
                <i class="edit-icon" onclick="editTask(${index})">✏️</i>
                <i class="delete-icon" onclick="deleteTask(${index})">🗑️</i>
            </div>
        `;

        taskList.appendChild(li);
    });
}

window.onload = displayTasks;


// ------------------------------
// DELETE TASK
// ------------------------------
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}


// ------------------------------
// EDIT TASK
// ------------------------------
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks[index];

    // open the form
    container.style.display = "none";
    taskContainer.style.display = "flex";

    taskInput.value = task.name;
    descInput.value = task.description;

    addTaskBtn.innerText = "Update Task";

    editIndex = index; // set editing index
}


// Make functions global so HTML onclick can call them
window.editTask = editTask;
window.deleteTask = deleteTask;
