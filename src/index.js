import { greeting } from "./project.js";
import "./styles.css";

console.log(greeting);

function setupUIEventListeners() {
    try {
        // DOMController.addProjectListener();
        // DOMController.addTodoListener();
    } catch (error) {
        console.error("Error in setupUIEventListeners:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {

});