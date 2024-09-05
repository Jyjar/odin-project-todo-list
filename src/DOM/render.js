import { app } from "../index.js";

class Render {
    renderProject(project) {
        const projectsDiv = document.querySelector(".projects");
        
        const projectElement = document.createElement("button");
        projectElement.textContent = project.name;

        projectsDiv.appendChild(projectElement);

        const trashCan = document.createElement("img");
        trashCan.src = "https://anjahrot.github.io/Todo-List/b4a7b26be64c05d0f239.svg"
        trashCan.id = "sidebarIcon";
        projectElement.appendChild(trashCan);

        const todoTitle = document.querySelector("#todoTitle");
        todoTitle.textContent = project.name;

        app.event.deleteProjectListener(trashCan, project);
        app.event.projectListener(projectElement, project);
    }

    deleteProject(projectElement) {
        projectElement.remove();
    }

    deleteTodo(todoElement) {
        todoElement.remove();
    }

    refreshTodos() {
        const todosDiv = document.querySelector(".todos");
        todosDiv.remove();

        const newTodosDiv = document.createElement("div");
        newTodosDiv.className = "todos";
        const taskContainer = document.querySelector(".taskContainer");
        taskContainer.appendChild(newTodosDiv);
    }

    renderTodos(project) {
        const todoTitle = document.querySelector("#todoTitle");
        todoTitle.textContent = project.name;
        
        const projectTodos = project.todos;
        const todosDiv = document.querySelector(".todos");

        projectTodos.forEach((todo) => {
            const todoElement = document.createElement("div");
            todoElement.className = "todoElement";
            todosDiv.appendChild(todoElement);

            const todoInfo = document.createElement("div");
            todoElement.appendChild(todoInfo);

            const inputCheckBox = document.createElement("input");
            inputCheckBox.type = "checkbox";
            inputCheckBox.className = "todo-checkbox";
            inputCheckBox.name = "todo-checkbox";
            inputCheckBox.checked = todo.isCompleted;
            app.event.checkBoxListener(inputCheckBox, todo);
            todoInfo.appendChild(inputCheckBox);

            if (todo.isCompleted) {
                todoElement.style.filter = "brightness(80%)";
                todoElement.style.textDecoration = "line-through";
            }

            const div = document.createElement("div");
            const title = document.createElement("h3");
            title.textContent = todo.title;
            div.appendChild(title);
            const dueDate = document.createElement("h5");
            dueDate.textContent = `Due date: ${todo.dueDate}`;
            div.appendChild(dueDate);
            todoInfo.appendChild(div);

            const priority = document.createElement("div");
            if (todo.priority === "High") {
                priority.className = "highPriorityDiv";
            } else if(todo.priority === "Medium") {
                priority.className = "mediumPriorityDiv";
            } else if(todo.priority === "Low") {
                priority.className = "lowPriorityDiv";
            }
            priority.textContent = todo.priority;
            div.appendChild(priority);

            const notes = document.createElement("p");
            notes.textContent = `Notes: ${todo.notes}`;
            div.appendChild(notes);

            const btnRow = document.createElement("div");
            const trashCan = document.createElement("img");
            trashCan.src = "https://anjahrot.github.io/Todo-List/b4a7b26be64c05d0f239.svg"
            trashCan.className = "contentIcon trashCan";
            btnRow.appendChild(trashCan);
            app.event.deleteTodoListener(trashCan);

            const edit = document.createElement("img");
            edit.src = "https://anjahrot.github.io/Todo-List/67d7ac9ac639190752c4.svg"
            edit.className = "contentIcon";
            btnRow.appendChild(edit);

            app.event.editModalListener(edit, todo);

            todoElement.appendChild(btnRow);
            
        })
    }

    updateTodosStyle(isChecked, checkBox) {
        const todosDiv = checkBox.closest('.todoElement');
        const title = checkBox.parentElement;
        if (isChecked) {
            todosDiv.setAttribute("style", "filter: brightness(80%)");
            title.setAttribute("style", "text-decoration: line-through")
        } else {
            todosDiv.setAttribute("style", "background-color: lightgreen");
            title.setAttribute("style", "text-decoration: ")
        }
    }
}

export { Render };
