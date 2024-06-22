import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Select, Text } from "@chakra-ui/react";
import axios from "axios";

const StatisticsComponent = () => {
  const [month, setMonth] = useState(1);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/statistics/", {
        params: { month },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <Flex p={5} gap={10}>
      <Flex
        mb={4}
        direction={{ base: "column", md: "row" }}
        gap={2}
        width={"100px"}
      >
        <Select
          placeholder="Select Month"
          value={month}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((mn) => (
            <option key={mn} value={mn}>
              {mn}
            </option>
          ))}
        </Select>
      </Flex>
      <Box
        className="table"
        p={5}
        flex={1}
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        bg="gray.50"
      >
        <Text fontSize="xl" mb={4} color={"teal"} fontFamily={"cursive"} fontWeight={500}>
          Statistics for Month {month}
        </Text>
        <Flex direction="column" gap={2}>
          <Text color={"#0d1b2a"}>
            Total Sale Amount: ${statistics.totalSaleAmount.toFixed(2)}
          </Text>
          <Text>Total Sold Items: {statistics.totalSoldItems}</Text>
          <Text>Total Not Sold Items: {statistics.totalNotSoldItems}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default StatisticsComponent;
