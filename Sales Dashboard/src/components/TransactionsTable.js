import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Flex,
  Select,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({
    description: "",
    min_price: "",
    max_price: "",
  });
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, [page, perPage, searchParams]);

  const fetchTransactions = async () => {
    try {
      const params = {
        page,
        per_page: perPage,
      };

      if (searchParams.description) {
        params.description = searchParams.description;
      }
      if (searchParams.min_price) {
        params.min_price = searchParams.min_price;
      }
      if (searchParams.max_price) {
        params.max_price = searchParams.max_price;
      }

      const response = await axios.get("http://localhost:5000/transactions", {
        params,
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const toggleDescription = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  let color = false;

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={10} backgroundColor={"brown.300"}>
      <Flex
        className="title"
        padding={4}
        borderRadius={"10px"}
        color={"#0d1b2a"}
        mb={4}
        direction={{ base: "column", md: "row" }}
        gap={2}
      >
        <Input
          placeholder="Search by description"
          name="description"
          color={"#0d1b2a"}
          _focus={{ borderColor: "teal" }}
          borderBottom={"3px solid teal"}
          value={searchParams.description}
          onChange={handleSearchChange}
        />
        <Input
          placeholder="Min price"
          type="number"
          name="min_price"
          _focus={{ borderColor: "teal" }}
          borderBottom={"3px solid teal"}
          value={searchParams.min_price}
          onChange={handleSearchChange}
        />
        <Input
          placeholder="Max price"
          type="number"
          name="max_price"
          _focus={{ borderColor: "teal" }}
          borderBottom={"3px solid teal"}
          value={searchParams.max_price}
          onChange={handleSearchChange}
        />
      </Flex>
      <TableContainer p={5} className="table">
        <Table>
          <TableCaption>Transactions</TableCaption>
          <Thead bg={"teal"} color={"white"}>
            <Tr>
              <Th color={"white"}>Sr No</Th>
              <Th color={"white"}>Title</Th>
              <Th color={"white"}>Description</Th>
              <Th color={"white"}>Price</Th>
              <Th color={"white"}>Sold</Th>
              <Th color={"white"}>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={transaction._id} background={color && "teal"}>
                <Td maxW={"100px"} height={"auto"} color={color && "white"}>
                  {index + 1 + (page - 1) * perPage}
                </Td>
                <Td
                  color={color && "white"}
                  maxW={"200px"}
                  whiteSpace={"normal"}
                  wordWrap={"break-word"}
                >
                  {transaction.title}
                </Td>
                <Td
                  color={color && "white"}
                  maxW={"400px"}
                  whiteSpace={"normal"}
                  wordWrap={"break-word"}
                >
                  <Text
                    color={color && "white"}
                    noOfLines={expanded[transaction._id] ? null : 3}
                    title={transaction.description}
                  >
                    {transaction.description}
                  </Text>
                  <Button
                    size="sm"
                    onClick={() => toggleDescription(transaction._id)}
                    variant="link"
                color={color && "#fec89a"}
                  >
                    {expanded[transaction._id] ? "Read Less" : "Read More"}
                  </Button>
                </Td>
                <Td color={color && "white"}>{transaction.price}</Td>
                <Td color={color && "white"}>
                  {transaction.sold ? "Yes" : "No"}
                </Td>
                <Td color={color && "white"}>
                  {new Date(transaction.dateOfSale).toLocaleDateString()}
                </Td>
                {(color = !color)}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        mt={4}
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
        gap={2}
      >
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Select
          value={page}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          maxWidth={"100px"}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default TransactionsTable;
