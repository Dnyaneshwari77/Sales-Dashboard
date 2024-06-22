import "./App.css";
import BarChartComponent from "./components/BarChartComponent";
import StatisticsTable from "./components/StatisticsTable";
import TransactionsTable from "./components/TransactionsTable";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <Box padding={10} bg={"#e0e1dd"}>
        <Text
          padding={5}
          color={"teal"}
          fontSize={"25px"}
          textAlign={"center"}
          className="title"
          fontStyle={"bold"}
          fontFamily={"cursive"}
          fontWeight={500}
        >
          Sales Dashboard
        </Text>
        <TransactionsTable />
        <StatisticsTable />
        <BarChartComponent />
      </Box>
    </ChakraProvider>
  );
}

export default App;
