import React, { useState, useEffect } from "react";
import { Box, useTheme, Select } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const BarChartComponent = () => {
  const theme = useTheme();
  const [month, setMonth] = useState(1);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/bar-chart/?month=${month}`
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [month]);

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const prepareChartData = () => {
    const labels = chartData.map((item) => item._id);
    const counts = chartData.map((item) => item.count);

    return {
      labels: labels,
      datasets: [
        {
          label: "Count",
          backgroundColor: theme.colors.teal[500],
          borderColor: theme.colors.teal[700],
          borderWidth: 1,
          hoverBackgroundColor: theme.colors.teal[600],
          hoverBorderColor: theme.colors.teal[800],
          data: counts,
        },
      ],
    };
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="md" className="table">
      <Select
        value={month}
        onChange={handleChange}
        placeholder="Select a month"
        mb={4} 
      >
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </Select>

      <Bar
        data={prepareChartData()}
        options={chartOptions}
        style={{ maxHeight: "400px", minHeight: "200px" }}
      />
    </Box>
  );
};

export default BarChartComponent;
