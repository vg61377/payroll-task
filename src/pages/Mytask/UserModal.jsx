import React, { useState, useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MuiModal from "../../components/Modal/MuiModal";
import userService from "../../services/userService";
import useDebounce from "../../hooks/useDebounce";

const UserListModal = ({ open, onClose, onConfirm, selectedUsers }) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(selectedUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = useRef(null);
  const [limit] = useState(10);
  const debounceValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (!open) return;

    const params = {
      from: page,
      to: limit,
      text: debounceValue,
    };
    fetchUsers(params, page === 1);
  }, [page, debounceValue, open]);

  const fetchUsers = async (params, reset = false) => {
    if (!hasMore && !reset) return;

    setLoading(true);
    setError(null);
    try {
      const res = await userService.getUser(params);
      const data = res?.data?.data?.Members || [];
      const total = res?.data?.data?.TotalRecords || 0;
      setTotal(total);

      if (reset) {
        setUsers(data);
        setHasMore(data.length < total);
      } else {
        setUsers((prev) => {
          const updated = [...prev, ...data];
          setHasMore(updated.length < total);
          return updated;
        });
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!listRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 20;

    if (isNearBottom) {
      setPage((prev) => prev + 1);
    }
  };

  const handleToggle = (userId) => {
    const currentIndex = selected.indexOf(userId);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(userId);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleConfirm = () => {
    const selectedUserObjects = users.filter((user) =>
      selected.includes(user.UserId)
    );
    onConfirm(selectedUserObjects);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelected([]);
    setPage(1);
    onClose();
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      title="Select Users"
      size="small"
      footerContent={
        <>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            disabled={selected.length === 0}
          >
            Confirm ({selected.length})
          </Button>
        </>
      }
    >
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box
        ref={listRef}
        onScroll={handleScroll}
        sx={{ maxHeight: 260, overflow: "auto" }}
      >
        {console.log("res", selectedUsers)}
        {console.log("res2", selected)}
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {users?.map((user) => (
            <ListItem
              key={user?.UserId}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => handleToggle(user.UserId)}
                  checked={selected.indexOf(user.UserId) !== -1}
                />
              }
              disablePadding
            >
              <ListItemButton onClick={() => handleToggle(user.UserId)}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user?.Name} secondary={user?.Email} />
              </ListItemButton>
            </ListItem>
          ))}

          {loading && (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress size={24} />
            </Box>
          )}

          {error && (
            <Typography color="error" p={2}>
              {error}
            </Typography>
          )}

          {!loading && !error && users.length === 0 && (
            <Typography p={2} textAlign="center" color="text.secondary">
              No users found
            </Typography>
          )}
        </List>
      </Box>
    </MuiModal>
  );
};

export default UserListModal;
