import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Edit, Delete, ChatBubbleOutline } from "@mui/icons-material";
import Table from "@/components/Table/Table";
import styles from "./MyTaskTable.module.scss";

function MyTaskTable({
  rows,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  loading,
  onComplete,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const columns = [
    {
      field: "title",
      headerName: "Task",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className={styles.taskCell}>
            <div className={styles.taskLeft}>
              {row.completed ? (
                <span className={styles.completedCheck}>✔</span>
              ) : (
                <button
                  className={styles.pendingCircle}
                  onClick={() => onComplete?.(row)}
                  title="Mark as Complete"
                />
              )}

              <div className={styles.textWrapper}>
                <div className={styles.taskTitle}>{row.title}</div>
                {row.description && (
                  <div className={styles.taskDescription}>
                    {row.description}
                  </div>
                )}
              </div>
            </div>

            {row.dateLabel && (
              <div
                className={`${styles.taskDate} ${
                  row.completed ? styles.completed : styles.pending
                }`}
              >
                {row.dateLabel}
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Action",
      width: 60,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={(e) => handleMenuOpen(e, params.row.id)}
          >
            <MoreVert fontSize="small" />
          </IconButton>

          {selectedId === params.row.id && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Edit fontSize="small" style={{ marginRight: 8 }} /> Edit
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Delete fontSize="small" style={{ marginRight: 8 }} /> Delete
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ChatBubbleOutline
                  fontSize="small"
                  style={{ marginRight: 8 }}
                />{" "}
                Comment
              </MenuItem>
            </Menu>
          )}
        </>
      ),
    },
  ];

  return (
    <Table
      rows={rows}
      columns={columns}
      loading={loading}
      paginationMode="server"
      paginationModel={{ page, pageSize: limit }}
      onPaginationModelChange={(model) => {
        if (model.page !== page) onPageChange(model.page);
        if (model.pageSize !== limit) onLimitChange(model.pageSize);
      }}
      rowCount={total}
      disableColumnMenu
      disableRowSelectionOnClick
      getRowHeight={() => "auto"} // ✅ auto height so no cutting
    />
  );
}

export default MyTaskTable;
