import React, { useEffect, useState } from "react";
import styles from "./MyTask.module.scss";
import MuiButton from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import UserListModal from "./UserModal";
import AddTaskModal from "./AddTaskModal";

function MyTask() {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [addTask, setAddTask] = useState(false);

  const onConfirm = (value) => {
    let ids = value.map(user => user.UserId);
    setSelectedUsers(ids);
  };

  return (
    <div>
      <div className={styles.filterDiv}>
        <div className={styles.leftsideDiv}>
          <MuiButton size="small">Filter</MuiButton>
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
      {addTask && <AddTaskModal  onClose={() => setAddTask(false)} />}
    </div>
  );
}

export default MyTask;
