import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import Field from "../../components/Field/Field";
import DatePicker from "../../components/DatePicker/DatePicker";
import FilePicker from "../../components/FilePicker/FilePicker";
import { Calendar, Users, UserPlus, Paperclip, Target, X } from "lucide-react";
import styles from "./AssignToMe.module.scss";

function AssignToMe() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: null,
      file: null,
    },
  });

  const [activeBtn, setActiveBtn] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dateValue = watch("date");

  const onSubmit = (value) => {
    console.log("Form Data:", value);
    reset();
    setActiveBtn(null);
    setSelectedFile(null);
    setShowDatePicker(false);
  };

  const handleToday = () => {
    const now = new Date();
    setValue("date", now);
    setActiveBtn("today");
    setShowDatePicker(false);
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setValue("date", tomorrow);
    setActiveBtn("tomorrow");
    setShowDatePicker(false);
  };

  const handleCalendarClick = () => {
    setActiveBtn("calendar");
    setShowDatePicker(true);
  };

  const clearSelection = () => {
    setActiveBtn(null);
    setValue("date", null);
    setShowDatePicker(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setValue("file", file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setValue("file", null);
  };

  return (
    <form
      id="task-form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.assignForm}
    >
      {/* Title */}
      <Field
        controller={{
          name: "title",
          control,
          rules: { required: "Required Field" },
          render: ({ field }) => (
            <Input
              {...field}
              error={errors.title}
              label="Title"
              size="small"
              variant="outlined"
              required
            />
          ),
        }}
        error={errors?.title}
      />

      {/* Description */}
      <Field
        controller={{
          name: "description",
          control,
          rules: { required: "Required Field" },
          render: ({ field }) => (
            <Input
              {...field}
              error={errors.description}
              label="Description"
              size="small"
              variant="outlined"
              multiline
              minRows={3}
              required
            />
          ),
        }}
        error={errors?.description}
      />

      {/* Date Buttons */}
      <div className={styles.dateActionSection}>
        <label className={styles.fieldLabel}>Select Date</label>

        <div className={styles.buttonGroup}>
          {/* TODAY */}
          {(activeBtn === null || activeBtn === "today") && (
            <div className={styles.btnWrapper}>
              <button
                type="button"
                onClick={handleToday}
                className={`${styles.btnIcon} ${
                  activeBtn === "today" ? styles.active : ""
                }`}
              >
                Today
              </button>
              {activeBtn === "today" && (
                <button
                  type="button"
                  className={styles.topRightX}
                  onClick={clearSelection}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* TOMORROW */}
          {(activeBtn === null || activeBtn === "tomorrow") && (
            <div className={styles.btnWrapper}>
              <button
                type="button"
                onClick={handleTomorrow}
                className={`${styles.btnIcon} ${
                  activeBtn === "tomorrow" ? styles.active : ""
                }`}
              >
                Tomorrow
              </button>
              {activeBtn === "tomorrow" && (
                <button
                  type="button"
                  className={styles.topRightX}
                  onClick={clearSelection}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* CALENDAR */}
          {(activeBtn === null || activeBtn === "calendar") && (
            <div className={`${styles.btnWrapper} ${styles.calendarWrapper}`}>
              <button
                type="button"
                className={`${styles.btnIcon} ${
                  activeBtn === "calendar" ? styles.active : ""
                }`}
                onClick={handleCalendarClick}
              >
                <Calendar size={18} />
                {dateValue && (
                  <span className={styles.dateLabel}>
                    {new Date(dateValue).toLocaleString()}
                  </span>
                )}
              </button>

              {activeBtn === "calendar" && (
                <button
                  type="button"
                  className={styles.topRightX}
                  onClick={clearSelection}
                >
                  <X size={12} />
                </button>
              )}

              {showDatePicker && activeBtn === "calendar" && (
                <div className={styles.calendarPopup}>
                  <DatePicker
                    value={dateValue}
                    onChange={(date) => {
                      setValue("date", date);
                      setActiveBtn("calendar");
                      setShowDatePicker(false);
                    }}
                    hideInput
                  />
                </div>
              )}
            </div>
          )}

          {/* GROUP ICON */}
          <button
            type="button"
            className={styles.btnIcon}
            onClick={() => alert("Open group modal")}
          >
            <Users size={18} />
          </button>

          {/* ADD USER ICON */}
          <button
            type="button"
            className={styles.btnIcon}
            onClick={() => alert("Open add user modal")}
          >
            <UserPlus size={18} />
          </button>

          {/* FILE PICKER */}
          <div className={styles.fileWrapper}>
            <label className={`${styles.btnIcon} ${styles.fileLabel}`}>
              <Paperclip size={18} />
              {selectedFile && (
                <span className={styles.fileName}>{selectedFile.name}</span>
              )}
              <input
                type="file"
                className={styles.hidden}
                onChange={handleFileSelect}
              />
            </label>
            {selectedFile && (
              <button
                type="button"
                className={styles.topRightX}
                onClick={removeFile}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* TARGET ICON */}
          <button
            type="button"
            className={styles.btnIcon}
            onClick={() => alert("Target action")}
          >
            <Target size={18} />
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className={styles.submitContainer}>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default AssignToMe;
