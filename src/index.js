import { AppLogic } from "./appLogic.js";
import styles from "./styles.css";

export const app = new AppLogic();

app.initEventListener();
app.initProject(); 


// TODO:
// 1. Fix checkbox
    // 1.1 When checked: mark over todo Title and dueDate, make background-color darker.
// 2. Make edit todo work
    // 2.1 Add edit event handler
    // 2.2 Make edit form 
    // 2.3 Open edit form on click