import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;

const HorizontalRule: React.FC<Props> = ({ ...props }) => {
  return (
    <hr
      {...props}
      className={twMerge("border-1 h-px bg-gray-700", props.className)}
    />
  );
};
export default HorizontalRule;
