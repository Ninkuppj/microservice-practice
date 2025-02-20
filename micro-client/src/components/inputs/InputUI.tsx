import { Textarea, Input } from "@nextui-org/react";
import { InputPropsUI } from "./InputsProps.types";

const InputUI: React.FC<InputPropsUI> = ({
    label,
    value,
    type,
    classNames,
    className,
    disabled,
    register,
    errors,
    isTextArea,
    ...props

}) => {
    return (
        <>
            {isTextArea ? (
                <Textarea
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
                            errors && errors[type!]
                                ? "border-error"
                                : "border-neutral-300"
                        }
                        ${
                            errors && errors[type!]
                                ? "focus:border-error"
                                : "focus:border-black"
                        }
                    `}
                ></Textarea>
            ) : (
                <Input
                    disabled={disabled}
                    {...register}
                    {...props as  any}
                    value={value}
                    type={type}
                    label={label}
                    labelPlacement="outside-left"
                    classNames={classNames?classNames:{
                        label: "w-[40%] text-[13px] text-right top-5",
                        inputWrapper: "bg-white border-1 ",
                      }}
                    className=" h-[8%]"
                />
            )}

            {errors && errors[type!] && (
                <div className="text-error text-sm">
                    {errors[type!]?.message as string}
                </div>
            )}
            </>
    );
};

export default InputUI;