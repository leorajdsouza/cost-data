import { InputBase, Paper } from "@mui/material";
import { ChangeEvent } from "react";

interface onSearchI {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function Search({ onSearch, placeholder }: onSearchI) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        mb: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <InputBase
        onChange={onSearch}
        sx={{ ml: 1, flex: 1 }}
        placeholder={`Search by ${placeholder?.toLowerCase()}` || "Search"}
      />
    </Paper>
  );
}
