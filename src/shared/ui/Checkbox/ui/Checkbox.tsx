import { Control, Controller, FieldValues, Path } from "react-hook-form";
import s from "./Checkbox.module.scss"

export type CheckboxProps<T extends FieldValues> = {
  type?: CheckboxType;
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: boolean;
  isDisabled?: boolean;
};

export enum CheckboxType {
  CROSS = "cross",
  CHECK = "check",
}

const getCheckboxType = (type: CheckboxType) => {
    switch (type) {
      case CheckboxType.CROSS:
        return (
          <>
            <div
              className={s.cl1}
              style={{
                width: "100%",
                height: "25%",
                top: "40%",
                transform: "rotate(45deg)",
              }}
            ></div>
            <div
              className={s.cl1}
              style={{
                width: "100%",
                height: "25%",
                top: "40%",
                transform: "rotate(135deg)",
              }}
            ></div>
          </>
        );
      case CheckboxType.CHECK:
        return (
          <>
            <div
              className={s.cl1}
              style={{
                width: "50%",
                height: "25%",
                transform: "rotate(35deg)",
                left: "6%",
                bottom: "15%",
              }}
            ></div>
            <div
              className={s.cl1}
              style={{
                width: "90%",
                height: "25%",
                transform: "rotate(125deg)",
                left: "18%",
                bottom: "35%",
              }}
            ></div>
          </>
        );
    }
  };

export const Checkbox = <T extends FieldValues>({
    name,
    control,
    isDisabled = false,
    error = false,
    type = CheckboxType.CHECK,
  }: CheckboxProps<T>) => {
    return (
      <Controller
        control={control}
        render={({ field }) => {
          return (
            <label
                className={`${s.cl3} ${isDisabled ? s.cl5 : ''} ${error ? s.error : ''}`}
            >
              <div
                className={s.cl2}
                style={{ width: "1.4rem", height: "1.4rem" }}
              >
                <div
                className={s.cl6}
                >
                  {field.value && getCheckboxType(type)}
                  <input
                    ref={field.ref}
                    name={field.name}
                    checked={field.value}
                    onChange={(...args) => {
                      if (isDisabled) return;
                      field.onChange(...args);
                    }}
                    className={s.cl4}
                    type="checkbox"
                  />
                </div>
              </div>
            </label>
          );
        }}
        name={name}
      />
    );
  };

export default Checkbox;