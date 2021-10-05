//Card function in html
function createTaskHtml (currentId, names, description, assignedTo, statusD, dueDate) {
  console.log(currentId);
  const html =`<div class="col" id="${currentId}">
  <div class="mx-auto card" style="width: 14rem;">
    <div class="card-body">
      <h5 class="card-name">Name:</h5>
      <p class="card-text">${names}</p>
      <h5 class="card-name">Description</h5>
      <p class="card-text">${description}</p>
      <h5 class="card-name">Assigned To:</h5>
      <p class="card-text">${assignedTo}</p>
      <h5 class="card-status">Status:</h5>
      <p class="card-text">${statusD}</p>
      <h5 class="card-name">DueDate:</h5>
      <p class="Date">${dueDate}</p>
      <a href="#" class="btn btn-success done-button ${(statusD == "Done") ? "d-none" : ""}
      " id="${currentId}">Mark as Done</a>
      <a href="#" class="btn btn-danger delete-button">delete</a>
    </div>
  </div>
</div>`

return html;
}



 
//Task 5 - Creating a TaskManager
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId
      }
 
//addTask method
    addTask(names, description, assignedTo,statusD, dueDate) {
    
      const task = {
        // Incrementing the currentId for each new task
        id: this.currentId++,
        names: names,
        description: description,
        assignedTo: assignedTo,
        statusD: statusD,
        dueDate: dueDate,
      };

      this.tasks.push(task);
  }
  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      console.log(this.tasks[i].id);
      console.log("task id", taskId);
      // Get the current task in the loop
      const task = this.tasks[i];
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id == taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;
  };

  // Rendering the tasks items
   render() {
    let tasksHtmlList = [];
    //html array store
    for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // function formattedDate(selectedDate) {
      //         const date = new Date();
      
      //         console.log("check formattedDate");
      
          // const date = new Date(task.dueDate); 
      // let day = date.getDate();
      // let month = date.getMonth() + 1; //January is 0!
      // let yearNow = today.getFullYear();
      // if (day < 10) {
      //   day = '0' + day;
      // }
    
      // if (month < 10) {
      //   month = '0' + month;
      // }

      // selectedDate = yearNow + "/" + "/"

       //Task html
      console.log("render function");
      const taskHtml = createTaskHtml(
        task.id,
        task.names,
        task.description,
        task.assignedTo,
        task.statusD,
        formattedDate,
        );
      console.log(taskHtml);

      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);
    }

    // tasksHtml joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Setting the innerHTML of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;

  }

  save() {
    // Create a JSON string and storing to local storage
   const tasksJson = JSON.stringify(this.tasks);
   localStorage.setItem("tasks", tasksJson);
  
    //Converting currentId to a string and storing to local storage;
    const currentId = String(this.currentId);
    localStorage.setItem("currentId", currentId );
   }
  
  load() {
    // Checking and saving tasks saved in localStorage
    if (localStorage.getItem("tasks")) {
      const tasksJson = localStorage.getItem("tasks");
  
    // Convert to an array and store in this.tasks
      this.tasks = JSON.parse(tasksJson);
    }
  
    // Check and get the string currentId in localStorage, 
        if (localStorage.getItem("currentId")) {
        const currentId = localStorage.getItem("currentId");
        // converting currentId to Number and storing it
        this.currentId = Number(currentId);
    }
  }
  
  deleteTask(taskId) {
    // Create an empty array and store in newTasks
    const newTasks = [];
  
    // Loop over the tasks and get the current task
    for (let i = 0; i < this.tasks.length; i++) {
         const task = this.tasks[i];
         console.log(task);
  
      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }
  
    // Set this.tasks to newTasks
    this.tasks = newTasks; 

  }
}
