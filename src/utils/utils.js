export const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
