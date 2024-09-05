import { Project } from "./project.js";

class ProjectHandler {
    constructor() {
        this.projects = this.loadProjects() || [];
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.saveProjectState();
        return newProject;
    }

    getProjects() {
        return this.projects;
    }

    deleteProject(project) {
        const index = this.projects.indexOf(project);
        if (index > -1) {
            this.projects.splice(index, 1);
            this.saveProjectState();
        }
    }

    saveProjectState() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    loadProjects() {
        const projects = localStorage.getItem('projects');
        if (projects) {
            const projectData = JSON.parse(projects);
            return projectData.map(project => {
                const proj = new Project(project.name);
                proj.todos = project.todos;
                return proj;
            });
        }
        return [];
    }
}

export { ProjectHandler };
