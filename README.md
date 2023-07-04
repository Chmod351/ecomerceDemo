
# Open Source Project Contribution Guide

Welcome to the open-source contribution guide for the Ecommerce frontend project! This project is developed using React, Redux, and Styled-Components. It consumes the [Api](https://github.com/yamilt351/api-rest). 
for data retrieval. To better understand the API and its endpoints, we recommend carefully reading the [Project Documentation](https://documenter.getpostman.com/view/21643141/2s93sXcaLf#f3eb5112-676b-46c6-89a2-f5dd6b6c0927) . Feel free to ask any questions or provide feedback. 

## Requirements

- Node.js installed
- npm package manager installed
- Basic knowledge of React and CSS


## Installation
- Make sure you have [nodejs](https://nodejs.org/en) & [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed
- Fork the project
- Open the terminal in the project's root folder and run npm install, and finally npm start
- Create a .env file and add your Stripe API key (ONLY IF YOU NEED TO MODIFY THE STRIPE API).

## Usage
- The Components folder contains reusable components
- The Pages folder contains views where components are rendered.
- The data folder contains iterable elements such as footer and navbar items.
- The Utils folder contains the theme, login messages, Toastify messages, and API logic.
- The requestMethods file contains Axios configuration. Use publicRequests to make API calls, as it is configured to send cookies.
- The Redux folder contains Redux-Toolkit configuration
- responsive.js contains responsive design objects to maintain the project's responsiveness.

## Contribution
- Make comments in your changes, make them easy to read
- Keep your changes small and focused (e.g., if your pull request is about the shopping cart, avoid making changes to unrelated components).
- Provide clear descriptions and include screenshots/videos in your PRs. Explain the problem you solved, why your PR should be implemented, and add visual evidence. (PRs without evidence may not be accepted).
- BEFORE making a PR, run git pull to keep your local project up to date and avoid conflicts.
- Make your PRs to the Development branch.
- In the Pull Requests (PRs) made to the DEVELOPMENT branch, you should include the link to your task on Trello to facilitate tracking
- Be respectful to others.
  
## Style Guide

Follow the code style guidelines and naming conventions:
- Component/views styles are located at the top, below the imports. The parent element is the Container, and the child element is the Wrapper. Other elements should have descriptive names based on their respective HTML elements

## License

The project is distributed under the GNU License.

## Tasks
- [trello](https://trello.com/b/PZR0coVQ/ecomerce-frontend) has a Kanban structure
- The tasks in the backlog are the ones that can be developed, but they may not necessarily be developed
- To-Do Tasks are tasks that we must do.
- The assigned tasks will be marked as Doing.
- Once the PR is done, the task is moved to Review, where its approval or rejection will be awaited. In case of rejection, the task will be marked again as To-Do, and another PR should be done with the new changes
- In case of approval, it will be marked as completed.
- If it's not mentioned in the backlog, don't do it.

