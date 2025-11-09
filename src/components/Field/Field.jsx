import { Controller } from "react-hook-form";
import styles from "./Field.module.scss";
import { combineClasses } from "../../utils/utils";

const Field = ({ controller, className, error, label }) => {
  return (
    <div className={combineClasses(styles.fieldContainer, className)}>
      {label?.title && (
        <label className={styles.label}>
          {label?.title} {label?.required && <span>*</span>}
        </label>
      )}
      <Controller
        name={controller?.name}
        control={controller?.control}
        rules={controller?.rules}
        render={controller?.render}
      />
      <div className={styles.errorContainer}>
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    </div>
  );
};

export default Field;
