import { Todo } from "../todo/todo.js";

class Project {
    constructor(name, todos = [], toggle = false) {
        this.name = name;
        this.todos = todos;
        this.toggle = toggle;
    }

    addTodo(title, dueDate, priority, notes) {
        const newTodo = new Todo(title, dueDate, priority, notes);
        this.todos.push(newTodo);
        return newTodo;
    }

    toggleComplete() {

    }

    editTodo() {

    }

    deleteTodo() {

    }
}

export { Project };
