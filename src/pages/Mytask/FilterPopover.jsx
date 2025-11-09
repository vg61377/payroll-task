import React from "react";
import { Popover, Button, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import Field from "../../components/Field/Field";
import DatePicker from "../../components/DatePicker/DatePicker";
import styles from "./FilterPopover.module.scss";
import AutocompleteSelect from "../../components/Select/AutocompleteSelect";

const taskTypeOptions = [
  { label: "Bug", value: "bug" },
  { label: "Feature", value: "feature" },
  { label: "Task", value: "task" },
];

const createDateOptions = [
  { label: "Created Date", value: "createdDate" },
  { label: "Updated Date", value: "updatedDate" },
];

const dueDateOptions = [
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Week", value: "thisWeek" },
  { label: "Overdue", value: "overdue" },
  { label: "No Due Date", value: "noDueDate" },
];

function FilterPopover({ anchorEl, open, onClose, onApply }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskType: null,
      createDateType: null,
      fromDate: null,
      toDate: null,
      dueDate: null,
    },
  });

  const onSubmit = (data) => {
    onApply(data);
    onClose();
  };

  const handleClear = () => reset();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      classes={{ paper: styles.popover }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.header}>
          <h3>Filter</h3>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        {/* Task Type */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>By Task Type</p>

          <Field
            controller={{
              name: "taskType",
              control,
              render: ({ field }) => (
                <AutocompleteSelect
                  {...field}
                  label="Task Type"
                  options={taskTypeOptions}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  variant={"standard"}
                />
              ),
            }}
            error={errors?.taskType}
          />
        </div>

        {/* Create Date Section */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>By Date</p>

          <Box className={styles.row}>
            <Field
              controller={{
                name: "createDateType",
                control,
                render: ({ field }) => (
                  <AutocompleteSelect
                    {...field}
                    label="Create Date"
                    options={createDateOptions}
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                  />
                ),
              }}
              error={errors?.createDateType}
            />

            <Field
              controller={{
                name: "fromDate",
                control,
                render: ({ field }) => (
                  <DatePicker
                    {...field}
                    label="From Date"
                    size="large"
                    fullWidth
                  />
                ),
              }}
              error={errors?.fromDate}
            />

            <Field
              controller={{
                name: "toDate",
                control,
                render: ({ field }) => (
                  <DatePicker
                    {...field}
                    label="To Date"
                    size="large"
                    fullWidth
                  />
                ),
              }}
              error={errors?.toDate}
            />
          </Box>
        </div>

        {/* Due Date */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>By Due Date</p>

          <Field
            controller={{
              name: "dueDate",
              control,
              render: ({ field }) => (
                <AutocompleteSelect
                  {...field}
                  label="Due Date"
                  options={dueDateOptions}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              ),
            }}
            error={errors?.dueDate}
          />
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          <Button type="submit" variant="contained">
            Apply
          </Button>
        </div>
      </form>
    </Popover>
  );
}

export default FilterPopover;
