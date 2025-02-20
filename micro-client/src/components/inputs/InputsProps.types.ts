import { ChangeEventHandler } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export interface InputProps {
  id: string;
  label: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors;
  isTextArea?: boolean;
}
export interface InputPropsUI {
  id?: string;
  props?: InputProps & { onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> };
  label: string;
  htmlFor?: string;
  errorMessage?: React.ReactNode;
  onChange?(event: ChangeEventHandler<HTMLInputElement>): void | Promise<void>;
  isRequired?: boolean
  labelPlacement?:string;
  className?: string;
  classNames?:Record<string,boolean|number|string>;
  value?: string| number|Date;
  type?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors;
  isTextArea?: boolean;
  // props: Record<string, unknown>;
}