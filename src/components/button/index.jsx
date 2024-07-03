import React from "react";

//CSS
import styles from "./customButton.module.scss";

const CustomButton = ({
  border,
  backgroundColor,
  color,
  title,
  height,
  onClick,
  radius,
  width,
  btnIcon,
  isDefaultBtn,
  align,
  minWidth,
  textTransform,
  fontSize,
  borderColor,
}) => {
  return (
    <>
      <button
        className={
          isDefaultBtn
            ? styles.defaultButton + " " + align
            : styles.customButton
        }
        onClick={onClick}
        style={{
          backgroundColor,
          border,
          borderRadius: radius + " !important",
          height,
          width,
          color,
          align,
          minWidth,
          textTransform,
          fontSize,
          borderColor,
        }}
      >
        {btnIcon ? (
          <img src={btnIcon} className={styles.btnIcon} alt={btnIcon} />
        ) : (
          ""
        )}
        {title}
      </button>
    </>
  );
};

const WhiteBGButton = ({
  border,
  backgroundColor,
  color,
  title,
  height,
  onClick,
  radius,
  width,
}) => {
  return (
    <>
      <button
        className={styles.whiteBGButton}
        onClick={onClick}
        style={{
          backgroundColor,
          border,
          borderRadius: radius,
          height,
          width,
          color,
        }}
      >
        {title}
      </button>
    </>
  );
};

const GreenBGButton = ({
  border,
  backgroundColor,
  color,
  title,
  height,
  onClick,
  radius,
  width,
  textTransform,
}) => {
  return (
    <>
      <button
        className={styles.greenBGButton}
        onClick={onClick}
        style={{
          backgroundColor: backgroundColor + " !important",
          border,
          borderRadius: radius,
          height,
          width,
          color: color + " !important",
          textTransform: textTransform,
        }}
      >
        {title}
      </button>
    </>
  );
};

const SelectButtonWithIcon = ({
  select_name,
  data,
  input_name,
  input_id,
  input_type,
  labelTitle,
  placeholder,
  backgroundIcon,
}) => {
  return (
    <>
      {labelTitle ? <h6 className={styles.labelTitle}>{labelTitle}</h6> : ""}
      <div className={styles.selectDropDownField}>
        <select name={select_name} className={styles.selectStatus}>
          {placeholder ? <option value="">{placeholder}</option> : ""}
          {data.map((element) => (
            <option key={element.value} value={element.value}>
              {element.name}
            </option>
          ))}
        </select>
        <input
          type={input_type}
          name={input_name}
          id={input_id}
          className={
            backgroundIcon
              ? styles.input_info_selectBox
              : styles.input_info_selectBoxDefault
          }
        />
      </div>
    </>
  );
};


export {
  CustomButton,
  WhiteBGButton,
  SelectButtonWithIcon,
  GreenBGButton,
};
