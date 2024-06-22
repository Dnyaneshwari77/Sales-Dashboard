# Sales-Dashboard


## Description

It is a Sales Dashboard showing a transaction record along with Item sales per month and price range of items.

## Installation

To use this project in your local environment, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Dnyaneshwari77/Sales-Dashboard
   ```

2. Navigate to the project directory:

   ```bash
   cd Sales Dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```
4. Navigate to the server directory:

  ```bash
cd server

```

5. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```
   
## Components

### 1. TableComponent

#### Description

This component renders a table with data fetched from an API endpoint. It uses Chakra UI components for styling and pagination.

#### Installation

No additional installation steps are required specifically for this component.

#### Usage

In your React application, import and use the TableComponent:

```jsx
import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import TableComponent from "./TableComponent";

const App = () => {
  // Example state and handler
  const [searchParams, setSearchParams] = useState({
    page: 1,
    perPage: 10,
    title: "",
    minPrice: 0,
    maxPrice: 100,
    description: "",
  });

  const handleSearchParamsChange = (newSearchParams) => {
    setSearchParams(newSearchParams);
    // Add logic to fetch data based on updated search parameters
  };

  return (
    <Box p={8}>
      <TableComponent searchParams={searchParams} onSearchParamsChange={handleSearchParamsChange} />
      {/* Add other components or application logic here */}
    </Box>
  );
};

export default App;
```

### Props

#### `searchParams`

- **Type:** Object
- **Description:** Contains parameters for searching and pagination.

#### `onSearchParamsChange`

- **Type:** Function
- **Description:** Callback function to handle changes in search parameters.

### 2. SearchComponent

#### Description

This component implements a search input field using Chakra UI's Input component. It allows users to search by description with a dynamic border that changes based on user interaction.

#### Installation

No additional installation steps are required specifically for this component.

#### Usage

In your React application, import and use the SearchComponent:

```jsx
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import SearchComponent from "./SearchComponent";

const App = () => {
  const [searchParams, setSearchParams] = useState({ description: "" });

  const handleSearchChange = (e) => {
    setSearchParams({ description: e.target.value });
    // Add any additional logic for handling search input change
  };

  return (
    <Box p={8}>
      <SearchComponent searchParams={searchParams} handleSearchChange={handleSearchChange} />
      {/* Add other components or application logic here */}
    </Box>
  );
};

export default App;
```

### Props

#### `searchParams`

- **Type:** Object
- **Description:** Holds the search parameters, currently supports `description`.

#### `handleSearchChange`

- **Type:** Function
- **Description:** Callback function to handle changes in the search input field.

### 3. BarChartComponent

#### Description

This component displays data from an API in a bar chart using Chart.js and Chakra UI. It dynamically fetches data based on the selected month and renders it in a graphical format.

#### Installation

No additional installation steps are required specifically for this component.

#### Usage

In your React application, import and use the BarChartComponent:

```jsx
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import BarChartComponent from "./BarChartComponent";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(6); // Example initial selected month

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
    // Add logic to fetch chart data based on the selected month
  };

  return (
    <Box p={8}>
      <select onChange={handleMonthChange}>
        {/* Populate options with month values */}
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
      </select>
      <BarChartComponent month={selectedMonth} />
      {/* Add other components or application logic here */}
    </Box>
  );
};

export default App;
```

### Props

#### `month` (for BarChartComponent)

- **Type:** Number
- **Description:** Represents the selected month to fetch data for the bar chart.
---

