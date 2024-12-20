# Frontend Assignment - Kickstarter Projects Table
## Overview
In This project I have implemented a dynamic, paginated table to display the data which is fetched from a public API, and the table displays three key attributes.

1. S.No. (Serial Number)
2. Percentage Funded
3. Amount Pledged

I used React for building the UI and Vite for fast development setup. The table is designed to be scalable and responsive, ensuring a smooth user experience across devices. Custom hooks are used for fetching data and implementing pagination.

## Features
1. Dynamic Table: The table automatically adapts based on the fetched data and displays the project attributes.
2. Pagination: A maximum of 5 records are shown per page. Pagination is implemented using a custom hook for smooth navigation between pages.
3. Responsive UI: The layout adjusts itself for mobile, tablet, and desktop screens to ensure accessibility on various devices.
4. Error Handling: Proper error handling for failed API requests or empty data.
5. Technologies Used
   1. React for building the components.
   2. Custom React Hooks for data fetching and pagination logic.
   3. Raw CSS for styling the components.

## Setup
1. Clone the repository:
   git clone https://github.com/Ajit99999/frontend-assignment-ajit.git
2. Navigate to the project folder:
   cd funding-insight-table-app
3. Install dependencies:
   npm install
4. Start the development server:
   npm run dev
5. Open the app in your browser:
   http://localhost:5173