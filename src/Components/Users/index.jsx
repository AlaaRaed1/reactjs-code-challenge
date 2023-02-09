import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
const UsersTable = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const getListOfUsers = async () => {
    const response = await axios.get("users");
    setListOfUsers(response.data);
  };
  useEffect(() => {
    getListOfUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Users Table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>First Name</TableCell>

            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfUsers.map((row) => {
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
