import { Render } from "./DOM/render.js";
import { Modal } from "./DOM/modal.js";
import { Event } from "./DOM/event.js";
import { ProjectHandler } from "./project/projectHandler.js";

class AppLogic {
    constructor() {
        this.render = new Render();
        this.modal = new Modal();
        this.event = new Event();
        this.projectHandler = new ProjectHandler();
        this._selectedProject = null;
    }

    initEventListener() {
        this.event.addProjectListener();
        this.event.addTodoListener();
        this.event.initModalEventListeners();
    }

    initProject() {
        const defaultProjectName = "Cat";
        const defaultProject = this.projectHandler.addProject(defaultProjectName);
        const todo = defaultProject.addTodo("Feed", "2024-09-04", "High", "0.2 liter wet food");
        this.render.renderProject(defaultProject);
        this.render.renderTodos(defaultProject);
        this.selectedProject = defaultProject;
    }

    set selectedProject(project) {
        this._selectedProject = project;
    }

    get selectedProject() {
        return this._selectedProject;
    }
}

export { AppLogic };
