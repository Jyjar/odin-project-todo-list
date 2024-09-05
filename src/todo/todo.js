class Todo {
    constructor(title, dueDate, priority, notes, isCompleted = false) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isCompleted = isCompleted;
    }
}

export { Todo };