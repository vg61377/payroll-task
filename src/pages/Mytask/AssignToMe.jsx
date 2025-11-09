import React from "react";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import Field from "../../components/Field/Field";
import DatePicker from "../../components/DatePicker/DatePicker";
import FilePicker from "../../components/FilePicker/FilePicker";

function AssignToMe() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", date: null } });

  const onSubmit = (value) => {
    console.log("value", value);
    reset();
  };

  return (
    <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
      <Field
        controller={{
          name: "name",
          control,
          rules: { required: "Required Field" },
          render: ({ field }) => (
            <Input
              {...field}
              error={errors.name}
              size="small"
              variant="standard"
              required
              label="Name"
            />
          ),
        }}
        error={errors?.name}
      />
      <Field
        controller={{
          name: "description",
          control,
          rules: { required: "Required Field" },
          render: ({ field }) => (
            <Input
              {...field}
              error={errors.description}
              size="small"
              variant="standard"
              required
              multiline
              sx={{
                "& textarea": {
                  resize: "both",
                },
                width: "100%",
              }}
              label="Name"
            />
          ),
        }}
        error={errors?.description}
      />
      <Field
        controller={{
          name: "date",
          control,
          rules: { required: "Required Field" },
          render: ({ field }) => (
            <DatePicker
              {...field}
              error={errors.name}
              size="small"
              label="Date"
              variant="standard"
            />
          ),
        }}
        error={errors?.name}
      />
      <Field
        controller={{
          name: "file",
          control,
          rules: { required: "Required Field" },
          render: ({ field }) => (
            <FilePicker
              {...field}
              error={errors?.file}
              label="Upload document"
              accept=".pdf,.doc,.xls"
              variant="standard"
              required
            />
          ),
        }}
        error={errors?.file}
      />
    </form>
  );
}

export default AssignToMe;
