import { Box, Chip, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData } from "../../api/api";
import Dropdown from "../../components/dropdown/Dropdown";
import DataTable from "../../components/table/Table";
import { DATA_HEADER } from "../../constants";
import { ORDER } from "../../enums";
import "./Application.css";
import { sortData } from "./utils";

const FIELD_NAME = "Applications";

export default function Application() {
  const [applications, setApplication] = useState([]);
  const [applicationsDetail, setApplicationDetail] = useState([]);
  const [order, setOrder] = useState(ORDER.asc);

  useEffect(() => {
    const getApplication = async () => {
      let response = await fetchData("/applications");
      setApplication(response);
    };
    getApplication();
  }, []);

  const handelSelection = async (value: string) => {
    let response = await fetchData("/applications/" + value);
    setApplicationDetail(sortData(response, order, DATA_HEADER[3].id));
  };

  const handelSort = () => {
    setApplicationDetail(
      sortData(
        applicationsDetail,
        order === ORDER.asc ? ORDER.desc : ORDER.asc,
        DATA_HEADER[3].id
      )
    );
    setOrder(order === ORDER.asc ? ORDER.desc : ORDER.asc);
  };
  return (
    <Box sx={{ mt: 12 }}>
      <Box>
        {applications?.length > 0 ? (
          <Dropdown
            fieldName={FIELD_NAME}
            data={applications}
            onSelection={handelSelection}
          />
        ) : (
          <Skeleton animation="wave" height={100} />
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        {applicationsDetail?.length > 0 && (
          <>
            <Box
              sx={{
                mb: 1,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Typography>Sort by:</Typography>
              <Chip
                sx={{ m: 1 }}
                label="Latest"
                size="small"
                color="primary"
                onClick={handelSort}
                variant={order === ORDER.asc ? "outlined" : "filled"}
              />
            </Box>
            <DataTable
              searchKey={DATA_HEADER[0].id}
              searchPlaceholder={DATA_HEADER[0].name}
              tableHeader={DATA_HEADER}
              data={applicationsDetail}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
