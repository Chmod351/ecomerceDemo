
# Open Source Project Contribution Guide

Welcome to the open-source contribution guide for the Ecommerce frontend project! This project is developed using React, Redux, and Styled-Components. It consumes the [Api](https://github.com/yamilt351/api-rest). 
for data retrieval. To better understand the API and its endpoints, we recommend carefully reading the [Project Documentation](https://documenter.getpostman.com/view/21643141/2s93sXcaLf#f3eb5112-676b-46c6-89a2-f5dd6b6c0927) . Feel free to ask any questions or provide feedback. 


## Features

- Dark and Light themes
- Session management
- Implemented shopping cart
- Pagination
- Product search
- Related products
- Accessibility
- Fully responsive design
- Static slider
- Add/remove from the shopping cart
- Filter by color, size, and day
- Toast notifications using Toastify
- Stripe payment gateway

## Enpoints

- Get all products from the database
- Get related products
- Get a product by ID
- Add to the shopping cart
- Create purchase order
- Stripe payments
- Create user / login


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
- The requestMethods folder contains Axios configuration. Use publicRequests to make API calls, as it is configured to send cookies.
- The Redux folder contains Redux-Toolkit configuration
- responsive.js contains responsive design objects to maintain the project's responsiveness.

## Contribution
- Keep your changes small and focused (e.g., if your pull request is about the shopping cart, avoid making changes to unrelated components).
- Provide clear descriptions and include screenshots/videos in your PRs. Explain the problem you solved, why your PR should be implemented, and add visual evidence. (PRs without evidence may not be accepted).
- Before making a PR, run git pull to keep your local project up to date and avoid conflicts.
- Make your PRs to the Development branch.
- Be respectful to others.
  
## Style Guide

Follow the code style guidelines and naming conventions:
- Component/views styles are located at the top, below the imports. The parent element is the Container, and the child element is the Wrapper. Other elements should have descriptive names based on their respective HTML elements

## License

The project is distributed under the GNU License.

## Tasks
[trello](https://trello.com/b/PZR0coVQ/ecomerce-frontend)

