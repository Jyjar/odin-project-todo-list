import { AppLogic } from "./appLogic.js";
import styles from "./styles.css";

export const app = new AppLogic();

app.initEventListener();
app.initProject(); 

// Improvements to be done: 
// 
// event class should only handle event listeners and 
// UI interactions while logic should move to todo, project, projectHandler.
//
// Get a specific class to handle Todos.
//
// 
/* Better structure:
/src
  /components
    /todo
      todo.js
      todoEvents.js
    /project
      project.js
      projectEvents.js
    /ui
      modal.js
      render.js
  /app
    appLogic.js
  /storage
    localStorageHandler.js
index.js
 */