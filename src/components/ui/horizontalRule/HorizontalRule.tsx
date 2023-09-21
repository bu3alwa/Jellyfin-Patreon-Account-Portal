import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

const HorizontalRule: React.FC<Props> = ({ ...props }) => {
  return (
    <hr
      {...props}
      className={twMerge("border-1 h-px bg-gray-700", props.className)}
    />
  );
};
export default HorizontalRule;
