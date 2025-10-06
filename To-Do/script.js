document.addEventListener("DOMContentLoaded",
() => {
  const add_button = document.getElementById("add-button");
  const add_task = document.getElementById("add-task");
  const task_container = document.getElementById("task-container");
  //created Task array
  // let Task = [];
  let Task = JSON.parse(localStorage.getItem("Task")) || [];

  Task.forEach((task) => renderTask(task));
  //now we will push test when add button click
  add_button.addEventListener("click", () => {
    let inputTask = add_task.value.trim();
    if (inputTask === "") return;
    const newTask = {
      id: Date.now(), //every time is different so id will diff
      text: inputTask, // which i input
      completed: false, //task is not added
    };

    Task.push(newTask);
    saveTask(); //saved in localstorage
    renderTask(newTask);
    add_task.value = ""; //initialise add_task with 0
    console.log(Task);
  });

  //now for rendering task so that it will show from localstorage
  function renderTask(task) {
    const li = document.createElement("li");

    li.setAttribute("data-id", task.id);
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === 'BUTTON') return;
      task.completed = !task.completed;
      li.classList.toggle("completed"); //nahi ghusa
      saveTask();
    });

    //for deleting Tast item except jisko click kiya hu
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      Task = Task.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });
    
    task_container.appendChild(li);
    console.log(task);
  }

  //save the task which taken as input
  function saveTask() {
    localStorage.setItem("Task", JSON.stringify(Task));
  }
});

