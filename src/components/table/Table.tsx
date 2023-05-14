import React, { useState, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./table.css";
import TablePagination from "@mui/material/TablePagination";
import Search from "../search/Search";

interface TableHeaderI {
  name: string;
  id: string;
}
interface TableI {
  searchKey: string;
  data: {}[];
  tableHeader: TableHeaderI[];
  searchPlaceholder: string;
}

export default function DataTable({
  tableHeader,
  data,
  searchKey,
  searchPlaceholder,
}: TableI) {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [searchPhase, setSearchPhase] = useState<string>("");

  const sliceData = (allData: any) => {
    return [...allData].slice(page * perPage, page * perPage + perPage);
  };

  const dataSet = React.useMemo(() => {
    const cloneData = [...data];
    if (searchPhase?.length > 0) {
      return sliceData(
        cloneData.filter((value: any) => {
          return value[searchKey].toLowerCase().includes(searchPhase);
        })
      );
    }

    return sliceData(cloneData);
  }, [page, perPage, data, searchPhase]);

  const TableHeader = () => {
    return (
      <TableRow>
        {tableHeader.map((data: TableHeaderI) => {
          return <TableCell>{data.name}</TableCell>;
        })}
      </TableRow>
    );
  };

  const tdData = () => {
    return dataSet.map((d: any, i: any) => {
      return (
        <TableRow key={i}>
          {tableHeader.map((v: any) => {
            if (typeof d[v.id] === "string") {
              return <TableCell>{d[v.id]}</TableCell>;
            }
          })}
        </TableRow>
      );
    });
  };

  console.log(dataSet);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangePerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handelSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPhase(e.currentTarget.value);
  };

  return (
    <>
      <Search onSearch={handelSearch} placeholder={searchPlaceholder} />

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHead>{TableHeader()}</TableHead>
            <TableBody>{tdData()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component={"div"}
          count={data.length}
          rowsPerPage={perPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePerPage}
        />
      </Paper>
    </>
  );
}
