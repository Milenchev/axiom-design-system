import React from "react";
import classes from "./FormSection.module.css";

export interface FormSectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export const FormSection = React.forwardRef<
  HTMLFieldSetElement,
  FormSectionProps
>(({ title, description, children }, ref) => {
  return (
    <fieldset ref={ref} className={classes.root}>
      <legend className={classes.legend}>{title}</legend>
      {description && <p className={classes.description}>{description}</p>}
      <div className={classes.content}>{children}</div>
    </fieldset>
  );
});

FormSection.displayName = "FormSection";
