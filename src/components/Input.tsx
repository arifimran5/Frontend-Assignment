import { cn } from "../utils/cn";

export default function Input({
  required,
  immutable,

  name,
}: {
  required: boolean;
  immutable: boolean;
  name: string;
}) {
  return (
    <input
      name={name}
      required={required}
      disabled={immutable}
      className={cn(
        "w-full px-2 py-1 rounded-md outline outline-2 outline-gray-200",
        immutable ? "bg-gray-200 cursor-not-allowed" : ""
      )}
      type="text"
    />
  );
}
