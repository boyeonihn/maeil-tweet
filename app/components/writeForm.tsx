import { TextArea, Button } from '.';

export default function WriteForm() {
  return (
    <form className="space-y-2">
      <TextArea label="What is happening?!" required />
      <Button text="Post" />
    </form>
  );
}
