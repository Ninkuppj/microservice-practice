interface ButtonProps {
  label: any | React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  type?: "button" | "submit";
  // icon?: IconType;
  bgType?: "primary" | "error" | "success";
}
