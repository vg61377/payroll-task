import React, { useEffect, useState } from "react";
import styles from "./MyTask.module.scss";
import MuiButton from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import UserListModal from "./UserModal";
import AddTaskModal from "./AddTaskModal";
import FilterPopover from "./FilterPopover";
import AppTabs from "../../components/Tabs/Tabs";
import MyTaskTable from "./MyTaskTable";
import OtherTabs from "./OtherTabs";

const totalRecords = 100;

function MyTask() {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rows, setRows] = useState([
    {
      id: 1,
      title: "Cdds",
      description: "cccd",
      dateLabel: "Completed On: Yesterday at 12:36 pm",
      completed: true,
    },
    {
      id: 2,
      title: "Test2",
      description: "cgvshdgv",
      dateLabel: "Today at 4:21 pm",
      completed: false,
    },
  ]);

  const handleFavorite = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t))
    );
  };

  const handleComplete = (row) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? { ...r, completed: true, dateLabel: "Completed Just Now" }
          : r
      )
    );
  };

  const onConfirm = (value) => {
    let ids = value.map((user) => user.UserId);
    setSelectedUsers(ids);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleApply = (data) => {
    console.log("Filters:", data);
  };

  return (
    <div>
      <FilterPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        onApply={handleApply}
      />
      <div className={styles.filterDiv}>
        <div className={styles.leftsideDiv}>
          <MuiButton size="small" onClick={handleOpen}>
            Filter
          </MuiButton>
          <MuiButton onClick={() => setOpen(true)} size="small">
            Add User
          </MuiButton>
        </div>
        <div className={styles.rightsideDiv}>
          <Input
            className={styles.input}
            size="small"
            label="Search"
            variant="standard"
          />
          <MuiButton
            onClick={() => setAddTask(true)}
            className={styles.addTask}
            size="small"
          >
            Add Task
          </MuiButton>
        </div>
      </div>
      <UserListModal
        selectedUsers={selectedUsers}
        open={open}
        onConfirm={onConfirm}
        onClose={() => setOpen(false)}
      />
      {addTask && <AddTaskModal onClose={() => setAddTask(false)} />}
      <AppTabs
        tabs={["My Task", "Assigned By Me", "CC", "Starred"]}
        value={tab}
        onChange={(e, val) => setTab(val)}
      />

      {tab === 0 && (
        <MyTaskTable
          rows={rows}
          page={page}
          limit={limit}
          total={50}
          onPageChange={setPage}
          onLimitChange={setLimit}
          onComplete={handleComplete}
        />
      )}
      {tab === 1 && <OtherTabs title={"Assigned By Me"} />}
      {tab === 2 && <OtherTabs title={"CC"} />}
      {tab === 3 && <OtherTabs title={"Starred"} />}
    </div>
  );
}

export default MyTask;
