type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  return <main className="flex flex-col items-center p-2">{children}</main>;
}
