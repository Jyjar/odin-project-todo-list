import { app } from "../index.js";

class Event {
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
            app.selectedProject = project;
        })
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
            app.render.renderProject(newProject);
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
            console.log(priority);
            const notes = modal.querySelector("#notes").value;

            const project = app.selectedProject;
            const newTodo = project.addTodo(title, dueDate, priority, notes);
            
            app.render.refreshTodos();
            app.render.renderTodos(project);
            app.modal.closeModal(modal);
        });
    }
}

export { Event };
