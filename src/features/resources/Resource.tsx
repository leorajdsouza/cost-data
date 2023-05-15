import { Box, Chip, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData } from "../../api/api";
import Dropdown from "../../components/dropdown/Dropdown";
import DataTable from "../../components/table/Table";
import { DATA_HEADER } from "../../constants";
import { ORDER } from "../../enums";
import { sortData } from "../../util/utils";

const FIELD_NAME = "Resources";

export default function Application() {
  const [resources, setResources] = useState([]);
  const [resourcesDetail, setResourcesDetail] = useState([]);
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const getResources = async () => {
      let response = await fetchData("/resources");
      setResources(response);
    };
    getResources();
  }, []);

  const handelSelection = async (value: string) => {
    let response = await fetchData("/resources/" + value);
    setResourcesDetail(sortData(response, order, DATA_HEADER[3].id));
  };

  const handelSort = () => {
    setResourcesDetail(
      sortData(
        resourcesDetail,
        order === ORDER.asc ? ORDER.desc : ORDER.asc,
        DATA_HEADER[3].id
      )
    );
    setOrder(order === ORDER.asc ? ORDER.desc : ORDER.asc);
  };
  return (
    <Box sx={{ mt: 12 }}>
      <Box>
        {resources?.length > 0 ? (
          <Dropdown
            fieldName={FIELD_NAME}
            data={resources}
            onSelection={handelSelection}
          />
        ) : (
          <Skeleton animation="wave" height={100} />
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        {resourcesDetail?.length > 0 && (
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
                variant={order === "asc" ? "outlined" : "filled"}
              />
            </Box>
            <DataTable
              searchKey={DATA_HEADER[0].id}
              searchPlaceholder={DATA_HEADER[0].name}
              tableHeader={DATA_HEADER}
              data={resourcesDetail}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
