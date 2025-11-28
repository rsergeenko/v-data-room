# V-Dataroom

Public URL: https://v-data-room.onrender.com/

*Note: This is a free instance and it will spin down with inactivity, which can delay requests by 50 seconds or more.*

## About The Project

A production-ready mini Data Room implementation.
This SPA supports nested folders, PDF uploads, renaming, deletion, previewing files, and deep navigation — all fully offline using IndexedDB persistence.

<video src="https://github.com/user-attachments/assets/04726405-0477-4b38-b440-e748447fc8bf" controls></video>

## Tech Stack

*   **Framework**: [React](https://reactjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Linting**: [ESLint](https://eslint.org/)
*   **State Management**: [Zustand](https://zustand.surge.sh/)
*   **IndexedDB Management**: [Dexie.js](https://dexie.org/)
*   **UI Components**: [Shadcn UI](https://shadcn.com/ui)

## Project Structure

The project follows a component-based architecture with a clear separation of concerns.

```
src/ 
  ├── api/ # Functions for interacting with external APIs 
  ├── assets/ # Static assets like images and fonts 
  ├── components/ # Reusable UI components 
  ├── constants/ # Constant values used across the application 
  ├── db/ # IndexedDB setup and management
  ├── hooks/ # Custom React hooks 
  ├── lib/ # Shared library functions 
  ├── pages/ # Top-level page components for each route 
  ├── routes/ # Routing configuration 
  ├── store/ # State management logic 
  ├── types/ # TypeScript type definitions 
  └── utils/ # Utility functions
```

## Getting Started

To get a local copy up and running, you can use Docker.

### Prerequisites

*   Docker must be installed on your machine.

### Running with Docker

The project includes a `Dockerfile` and an `nginx.conf`, which allows you to build and run it in a containerized environment.

1.  **Build the Docker image:**
    Open your terminal in the project root and run the following command. This will build the React application and package it with Nginx.

    ```sh
    docker build -t v-dataroom .
    ```

2.  **Run the Docker container:**
    After the image is built, you can start a container. The following command maps port 8080 on your local machine to port 80 inside the container.

    ```sh
    docker run -p 8080:80 v-dataroom
    ```

3.  **Access the application:**
    You can now access the application by navigating to `http://localhost:8080` in your web browser.

# Notes

Building a Data Room system can grow into a very large and nuanced project, and there are always additional features, optimizations, and refinements that could be implemented.
For this take-home assignment, I focused on delivering:

* the core functionality
* a clean and extensible architecture
* the default and most important corner cases
* a predictable and stable UX

Rather than trying to implement every possible enhancement, I prioritized correctness, clarity, and maintainability — qualities that matter most in real production systems.
 
### Page & data loading behavior

To simulate real-world data fetching, I intentionally added small delays (sleep) in the loading logic.
This allows:

* proper skeleton screens
* smooth UI transitions
* clearly observable loading states

Both rooms and folders/files are fully covered with loading indicators.

#### Non-existing rooms & folders

The app gracefully handles edge cases such as:

* deleted or invalid room IDs
* direct navigation to a non-existing folder
* missing or broken URLs

In each case, the user is redirected to a meaningful 404-like screen, improving robustness and trustworthiness.

#### Thoughtful architecture

The system is organized around a few key principles:

* Separation of concerns:
Rooms, folders, and files live in independent Zustand stores, each responsible for a single domain.
This reduces coupling and makes the system easier to evolve.

* Pure stores, smart components:
Stores contain only state and actions; all derived data (child folders/files, breadcrumbs, etc.) is computed inside components using useMemo.
This avoids unnecessary re-renders and simplifies the mental model.

* IndexedDB abstraction via Dexie:
Database access is encapsulated in small, focused API modules.
The UI never interacts with Dexie directly, which keeps the view layer clean and testable.

* Granular, composable components:
Breadcrumbs, dialogs, lists, rows, empty states, and popovers are all isolated.
Each is reusable and easy to extend — a foundation for future features (permissions, sharing, drag & drop, audit logging).

#### Scalable by design

Although the implemented scope matches the requirements of the assignment, the architecture supports easy expansion:

* adding search
* drag&drop for folder/file movement
* role-based access
* comments/annotations
* file previews and thumbnails, PDF reader
* real backend API integration
* adding tests (unit, integration, e2e)

Thanks to clean separation between storage, state, and UI, these features can be added with minimal refactoring.
