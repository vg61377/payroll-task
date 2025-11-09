import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./Table.module.scss";
import { pageValueOption } from "../../utils/constants";

function Table({
  rows,
  columns,
  disableColumnMenu = true,
  disableRowSelectionOnClick = true,
  ...rest
}) {
  return (
    <div className={styles.dataGridCompact}>
      <DataGrid
        className={styles.dataGridHeaderCompact}
        rows={rows}
        columns={columns}
        disableColumnMenu={disableColumnMenu}
        pageSizeOptions={pageValueOption}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        {...rest}
      />
    </div>
  );
}

export default Table;
