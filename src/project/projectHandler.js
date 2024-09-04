import { Project } from "./project.js";

class ProjectHandler {
    constructor() {
        this.projects = [];
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        return newProject;
    }

    getProjects() {
        return this.projects;
    }

    deleteProject(project) {
        const index = this.projects.indexOf(project);
        this.projects.splice(index, 1);
    }
}

export { ProjectHandler };
