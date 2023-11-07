interface DividerProps {
  text: string;
}

export default function Divider({ text }: DividerProps) {
  return <div className="divider">{text}</div>;
}
