import "./style.css";

interface ToDo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: ToDo[] = [];

const todoContainer = document.querySelector<HTMLDivElement>(".toDoContainer")!;
const todoInput = document.querySelector<HTMLInputElement>("input")!;
const myForm = document.querySelector<HTMLFormElement>("#myForm")!;

// Submit form
myForm.onsubmit = (e) => {
  e.preventDefault();

  if (!todoInput.value.trim()) return; // prevent empty todos

  const todo: ToDo = {
    title: todoInput.value,
    isCompleted: false,
    id: crypto.randomUUID(),
  };

  todos.push(todo);
  todoInput.value = "";

  renderTodo(todos);
};

// Create a single todo
const generateTodo = (todo: ToDo, index: number) => {
  const todo1: HTMLDivElement = document.createElement("div");
  todo1.className = "todo";
  todo1.style.animationDelay = `${index * 0.1}s`; // new: staggered animation

  // Creating checkbox
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.checked = todo.isCompleted;

  // Creating title
  const title: HTMLParagraphElement = document.createElement("p");
  title.className = "title";
  title.textContent = todo.title;

  if (todo.isCompleted) {
    title.classList.add("textCut");
  }

  // Creating delete button
  const deleteButton: HTMLButtonElement = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.textContent = "X";

  // Checkbox change event
  checkbox.onchange = () => {
    todo.isCompleted = checkbox.checked;
    renderTodo(todos);
  };

  checkbox.onchange = ()=>{
    title.classList.toggle("textCut");
  }

  // Delete button click event
  deleteButton.onclick = () => {
    const index = todos.findIndex((t) => t.id === todo.id);
    todos.splice(index, 1);
    renderTodo(todos);
  };

  // Append elements
  todo1.append(checkbox);
  todo1.append(title);
  todo1.append(deleteButton);

  todoContainer.append(todo1);
};

// Render all todos
const renderTodo = (todos: ToDo[]) => {
  todoContainer.innerHTML = ""; // Clear previous todos
  todos.forEach((todo, index) => {
    generateTodo(todo, index);
  });
};
