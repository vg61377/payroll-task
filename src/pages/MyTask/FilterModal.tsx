import React, { useEffect } from "react";
import {
  Popover,
  Typography,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";

const taskTypes = ["Recurring", "Non-Recurring", "Target"] as const;
const dateFields = ["Created Date", "Modified Date"] as const;
const dueDateOptions = [
  "Today",
  "Tomorrow",
  "This Week",
  "Overdue",
  "No Due Date",
] as const;

type DateField = (typeof dateFields)[number];

interface FilterState {
  taskType: string;
  dateField: DateField | "";
  fromDate: string;
  toDate: string;
  dueDate: string;
}

const initialFilters: FilterState = {
  taskType: "",
  dateField: "Created Date",
  fromDate: "",
  toDate: "",
  dueDate: "",
};

interface FilterPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  filter: FilterState;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  anchorEl,
  open,
  onClose,
  onApply,
  filter,
}) => {
  const { control, reset, handleSubmit } = useForm<FilterState>({
    defaultValues: initialFilters,
  });

  const onSubmit = (data: FilterState) => {
    onApply(data);
    onClose();
  };

  const handleClear = () => {
    reset(initialFilters);
  };

  const hasActiveFilters = Object.values(filter).some(
    (v) => v !== "" && v !== null
  );

  useEffect(() => {
    if (open && filter) {
      reset(filter);
    }
  }, [open, filter, reset]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          width: 480,
          borderRadius: 2,
          boxShadow: 3,
          fontSize: "14px",
          p: 0,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          borderBottom: "1px solid #eee",
        }}
      >
        <Typography fontSize="14px" fontWeight={600}>
          Filter
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ px: 2, py: 2 }}>
          {/* ✅ Task Type */}
          <Typography fontSize="13px" fontWeight="500">
            By Task Type
          </Typography>

          <Controller
            name="taskType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                fullWidth
                select
                size="small"
                label="Task Type"
              >
                {taskTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Typography fontSize="13px" fontWeight="500" mt={2}>
            By Date
          </Typography>

          <Controller
            name="dateField"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                fullWidth
                select
                size="small"
              >
                {dateFields.map((df) => (
                  <MenuItem key={df} value={df}>
                    {df}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Box display="flex" gap={2} mt={2}>
            <Controller
              name="fromDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  type="date"
                  fullWidth
                  size="small"
                  label="From"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <Controller
              name="toDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  type="date"
                  fullWidth
                  size="small"
                  label="To"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Box>

          {/* ✅ Due Date */}
          <Typography fontSize="13px" fontWeight="500" mt={2}>
            By Due Date
          </Typography>

          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                fullWidth
                select
                size="small"
                label="Due Date"
              >
                {dueDateOptions.map((dd) => (
                  <MenuItem key={dd} value={dd}>
                    {dd}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>

        {/* Footer Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            px: 2,
            py: 1.5,
            borderTop: "1px solid #eee",
          }}
        >
          {hasActiveFilters ? (
            // ✅ Clear button only if props.filter has something
            <Button
              onClick={() => {
                reset(initialFilters);
                onApply(initialFilters); // ✅ also wipe filters in parent
                onClose();
              }}
              sx={{ fontSize: "13px", textTransform: "none" }}
            >
              Clear
            </Button>
          ) : (
            // ✅ Cancel when no filters applied (props.filter is empty)
            <Button
              onClick={onClose}
              sx={{ fontSize: "13px", textTransform: "none" }}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none", fontSize: "13px", px: 3 }}
          >
            Apply
          </Button>
        </Box>
      </form>
    </Popover>
  );
};

export default FilterPopover;
