class Main {
  constructor() {
    this.status = [
      {
        title: "BackLog",
          color: "#6C757D",
      },
      {
        title: "InProgress",
        color: "#7E5BFF",
      },
      {
        title: "Review",
        color: "#FFC107",
      },
      {
        title: "Completed",
        color: "#198754",
      },
    
    ];

    this.todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    this.displayTodoList();
    document.getElementById("todoForm").addEventListener("submit", (event) => {
      event.preventDefault();
      // const form = document.getElementById('todoForm');
      // form.classList.remove('was-validated');
      this.addTask();
    });

    document.getElementById("searchButton").addEventListener("click", (event) => {
      event.preventDefault();
      const searchTerm = document.getElementById("search").value.trim().toLowerCase();
      this.filterAndDisplay(searchTerm);
  });
      
  document.getElementById("clearSearchButton").addEventListener("click", () => {
    document.getElementById("search").value = "";
    this.displayTodoList();
});

      const selectElement = document.getElementById("status");
      this.status.forEach((statusObj) => {
          const option = document.createElement("option");
          option.value = statusObj.title;
          option.textContent = statusObj.title;
          selectElement.appendChild(option);
      });
  }

  addTask() {
    const title = document.getElementById("validationCustom01").value;
    const description = document.getElementById("textArea").value;
    const status = document.getElementById("status").value;
    const id = Date.now();

    // if (!title) {
      console.warn("enter value befor submitting");
    // } else {
      const taskId = document.getElementById('editId').value;
      const taskToUpdate = this.todoList.find((task) => task.id == taskId);
      if (taskToUpdate) {
        taskToUpdate.title = title;
        taskToUpdate.description = description;
        taskToUpdate.status = status;
      } else {
        const task = { id, title, description, status };
        this.todoList.push(task);
      }

      localStorage.setItem("todoList", JSON.stringify(this.todoList));
      this.displayTodoList();
      this.clearForm();
    // }
  }

  displayTodoList() {
    const statusContainer = document.getElementsByClassName("todoContainer")[0];
    statusContainer.innerHTML = "";

    this.status.forEach((statusObj) => {
      
        const statusTasks = this.todoList.filter((task) => task.status === statusObj.title);

        const card = document.createElement("div");
        card.classList.add("card","col-md-3");
        card.style.border = `2px solid ${statusObj.color}`;
        card.style.borderRadius = `8px`;

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header", "text-white");
        cardHeader.innerText = statusObj.title;
        cardHeader.style.backgroundColor = statusObj.color

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        
        statusTasks.forEach((task) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");
            taskElement.innerHTML = `
            <div id="${task.id}" class="card mb-2" draggable="true">
            <div class="card-body saparate">
             <div class="card-title-group">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                </div>
                <a type class onclick="todo.editTask('${task.id}')">Edit</a>
                <a type class="text-danger" onclick="todo.deleteTask('${task.id}')">Delete</a>
                </div>
                </div>
            `;
            cardBody.appendChild(taskElement);
        });

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        // row.appendChild(card);
        statusContainer.appendChild(card);
    });

    
}

  deleteTask(id) {
    const index = this.todoList.findIndex((task) => task.id == id);
    if (index !== -1) {
      this.todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
      this.displayTodoList();
    } else {
      console.log("not found");
    }
  }

  editTask(id) {
    const task = this.todoList.find((task) => task.id == id);

    if (task) {
      document.getElementById("validationCustom01").value = task.title;
      document.getElementById("textArea").value = task.description;
      document.getElementById("statusDropdown").style.display = "block";
      document.getElementById("status").value = task.status;
      document.getElementById("editId").value = id;
    } else {
      console.log("task not found");
    }
  }

  clearForm() {
    document.getElementById("validationCustom01").value = "";
    document.getElementById("textArea").value = "";
    document.getElementById("statusDropdown").style.display = "none";
  }

filterAndDisplay(searchTerm) {
  const filteredTasks = this.todoList.filter(task => 
      task.title.toLowerCase().includes(searchTerm)
  );
  this.displayFilteredTodoList(filteredTasks);
}

displayFilteredTodoList(filteredTasks) {
  const statusContainer = document.querySelector('.todoContainer');
  statusContainer.innerHTML = "";

  this.status.forEach((statusObj) => {
      const filteredTasksByStatus = filteredTasks.filter(task => task.status === statusObj.title);

      const card = document.createElement("div");
      card.className = " card col-md-3";

      const cardHeader = document.createElement("div");
      cardHeader.className = "card-header text-white";
      cardHeader.textContent = statusObj.title;
      cardHeader.style.backgroundColor = statusObj.color;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      filteredTasksByStatus.forEach(task => {
          const taskElement = document.createElement("div");
          taskElement.className = "task";
          taskElement.innerHTML = `
          <div id="${task.id}" class="card mb-2" draggable="true">
          <div class="card-body saparate">
              <div class="card-title-group">
                  <h5 class="card-title">${task.title}</h5>
                  <p class="card-text">${task.description}</p>
              </div>
              <a type class onclick="todo.editTask('${task.id}')">Edit</a>
                <a type class="text-danger" onclick="todo.deleteTask('${task.id}')">Delete</a>
                </div>
                </div>
          `;
          cardBody.appendChild(taskElement);
      });

      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      statusContainer.appendChild(card);
  });
}

}

const todo = new Main();
