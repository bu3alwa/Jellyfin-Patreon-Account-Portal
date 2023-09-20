type Props = {
  size: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function Spacer({ size }: Props) {
  const spacerOptions = {
    1: "p-1",
    2: "p-3",
    3: "p-3",
    4: "p-4",
    5: "p-5",
    6: "p-6",
  };

  return <div className={spacerOptions[size]} />;
}
