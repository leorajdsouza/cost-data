import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import "./dropdown.css";

interface DropdownI {
  data: string[];
  onSelection: (type: string) => {};
  fieldName: string;
}

export default function Dropdown({ data, onSelection, fieldName }: DropdownI) {
  const onSection = (event: SelectChangeEvent): void => {
    const value = event.target.value;
    onSelection(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={{ bgcolor: "#fff" }}>{fieldName}</InputLabel>

      <Select onChange={onSection}>
        {data?.map((value, i) => {
          return <MenuItem value={value}> {value} </MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}
