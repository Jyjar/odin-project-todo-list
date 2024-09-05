import { app } from "../index.js";

class Event {
    constructor() {
        this.editingTodo = null;
    }

    addProjectListener() {
        const projectButton = document.querySelector("#projectsButton");
        projectButton.addEventListener("click", () => {
            const modal = document.getElementById("projectModal");
            app.modal.openModal(modal);
        });
    }

    addTodoListener() {
        const todoButton = document.querySelector("#todoButton");
        todoButton.addEventListener("click", () => {
            this.editingTodo = null;
            const modal = document.getElementById("todoModal");
            app.modal.openModal(modal);
        });
    }

    deleteProjectListener(trashCan, project) {
        trashCan.addEventListener("click", () => {
            app.projectHandler.deleteProject(project);
            app.render.deleteProject(trashCan.parentElement);
        });
    }

    deleteTodoListener(trashCan) {
        trashCan.addEventListener("click", () => {
            app.render.deleteTodo(trashCan.parentElement.parentElement);
        })
    }

    projectListener(projectElement, project) {
        projectElement.addEventListener("click", () => {
            app.render.refreshTodos();
            app.render.renderTodos(project)
            app.selectedProject = project;
        })
    }

    checkBoxListener(checkBox, todo) {
        checkBox.addEventListener("change", (e) => {
            const isChecked = e.currentTarget.checked
            todo.isCompleted = isChecked;
            app.render.updateTodosStyle(isChecked, checkBox);

            app.projectHandler.saveProjectState();
        });
    }

    editModalListener(editIcon, todo) {
        editIcon.addEventListener("click", () => {
            this.editingTodo = todo;  // Set the todo being edited
            const modal = document.getElementById("todoModal");

            document.querySelector("#title").value = todo.title;
            document.querySelector("#duedate").value = todo.dueDate;
            document.querySelector(`input[name="priority"][value="${todo.priority}"]`).checked = true;
            document.querySelector("#notes").value = todo.notes;

            app.modal.openModal(modal);
        });
    }

    initModalEventListeners() {
        const closeButtons = document.querySelectorAll(".close");
        closeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                app.modal.closeModal(e.target.closest(".modal"));
            });
        });
        
        const projectForm = document.querySelector("#projectForm");
        projectForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const modal = e.target.closest(".modal");
            const input = modal.querySelector("input");
            const newProject = app.projectHandler.addProject(input.value);
            app.render.renderProject(newProject)
            input.value = "";
            app.modal.closeModal(modal);

            app.render.refreshTodos();
            app.selectedProject = newProject;
        });

        const todoForm = document.querySelector("#todoForm");
        todoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const modal = e.target.closest(".modal");

            const title = modal.querySelector("#title").value;
            const dueDate = modal.querySelector("#duedate").value;
            const priority = modal.querySelector('input[name="priority"]:checked').value;
            const notes = modal.querySelector("#notes").value;

            const project = app.selectedProject;

            if (this.editingTodo) {
                this.editingTodo.title = title;
                this.editingTodo.dueDate = dueDate;
                this.editingTodo.priority = priority;
                this.editingTodo.notes = notes;
            } else {
                project.addTodo(title, dueDate, priority, notes);
            }

            app.projectHandler.saveProjectState();

            app.render.refreshTodos();
            app.render.renderTodos(project);

            todoForm.reset();

            app.modal.closeModal(modal);
        });
    }
}

export { Event };
