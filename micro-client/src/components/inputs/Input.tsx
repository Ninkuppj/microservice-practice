import React, { FC, Fragment } from "react";
// import styled from "styled-components";
import { InputProps } from "./InputsProps.types";

// const StyledInput = styled.input<InputProps>`
//   height: 40px;
//   width: 100%;
//   border-radius: 8px;
//   border: solid 1px
//     ${(props) =>
//       props.disabled
//         ? "#e4e3ea"
//         : props.error
//         ? "#a9150b"
//         : props.success
//         ? "#067d68"
//         : "rgb(209 213 219 / var(--tw-border-opacity))"};
//   background-color: #fff;
//   &:focus {
//     border: solid 2px #1b116e;
//   }
// `;

// const StyledLabel = styled.div<InputProps>`
//   font-size: 14px;
//   color: ${(props) => (props.disabled ? "#e4e3ea" : "#080808")};
//   padding-bottom: 2px;
// `;

// const StyledMessage = styled.div<InputProps>`
//   font-size: 14px;
//   color: #a9150b8;
//   padding-top: 4px;
// `;

// const StyledText = styled.p<InputProps>`
//   margin: 0px;
//   color: ${(props) =>
//     props.disabled ? "#e4e3ea" : props.error ? "#a9150b" : "#080808"};
// `;

// const Input: FC<InputProps> = ({
//   id,
//   disabled,
//   type,
//   label,
//   message,
//   errors,
//   success,className,
//   onChange,
//   placeholder,
//   ...props
// }) => {
//   return (
//     <Fragment>
//       <StyledLabel>
//         <StyledText disabled={disabled} error={error}>
//           {label}
//         </StyledText>
//       </StyledLabel>
//       <StyledInput
//         id={id}
//         type="text"
//         className={className}
//         onChange={onChange}
//         disabled={disabled}
//         error={error}
//         success={success}
//         placeholder={placeholder}
//         {...props}></StyledInput>
//       <StyledMessage>
//         <StyledText error={error}>{message}</StyledText>
//       </StyledMessage>
//     </Fragment>
//   );
// };
const Input: React.FC<InputProps> = ({
    id,
    label,
    value,
    type,
    disabled,
    register,
    errors,
    isTextArea,
}) => {
    return (
        <div className="w-full relative my-2">
            {isTextArea ? (
                <textarea
                    id={id}
                    disabled={disabled}
                    {...register}
                    placeholder=" "
                    defaultValue={value}
                    className={`
                        peer
                        w-full
                        p-4
                        pt-6
                        bg-white
                        text-black
                        border-2
                        rounded-md
                        outline-none
                        transition
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        ${
                            errors && errors[id]
                                ? "border-error"
                                : "border-neutral-300"
                        }
                        ${
                            errors && errors[id]
                                ? "focus:border-error"
                                : "focus:border-black"
                        }
                    `}
                ></textarea>
            ) : (
                <input
                    id={id}
                    disabled={disabled}
                    {...register}
                    placeholder=" "
                    defaultValue={value}
                    type={type}
                    className={`
                        peer
                        w-full
                        p-4
                        pt-6
                        bg-white
                        text-black
                        border-2
                        rounded-md
                        outline-none
                        transition
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        ${
                            errors && errors[id]
                                ? "border-error"
                                : "border-neutral-300"
                        }
                        ${
                            errors && errors[id]
                                ? "focus:border-error"
                                : "focus:border-black"
                        }
                    `}
                />
            )}

            {errors && errors[id] && (
                <div className="text-error text-sm">
                    {errors[id]?.message as string}
                </div>
            )}

            <label
                htmlFor={id}
                className={`
                    absolute
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    left-3
                    origin-[0]
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4  
                    ${errors && errors[id] ? "text-error" : "text-black"}
                `}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;