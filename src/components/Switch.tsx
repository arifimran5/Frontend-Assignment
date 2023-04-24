import * as Switch from "@radix-ui/react-switch";
import { cn } from "../utils/cn";
import { useState } from "react";

const SwitchButton = ({
  label,
  defaultValue,
  required,
  immutable,

  name,
}: {
  label: string;
  defaultValue: boolean;
  required: boolean;
  immutable: boolean;

  name: string;
}) => {
  const [checked, setChecked] = useState(defaultValue);
  return (
    <>
      <div
        className="flex items-center"
        style={{ display: "flex", alignItems: "center" }}
      >
        <label className="text-black leading-none pr-[15px]" htmlFor={label}>
          {label} <span className="text-red-500">{required ? "*" : ""}</span>
        </label>
        <Switch.Root
          name={name}
          disabled={immutable}
          className={cn(
            "w-[42px] h-[24px] rounded-full relative  bg-blue-900 data-[state=checked]:bg-blue-600 outline-none cursor-pointer",
            immutable ? "bg-gray-200 cursor-not-allowed" : ""
          )}
          id={label}
          onChange={() => {
            setChecked(!checked);
          }}
          defaultChecked={defaultValue}
        >
          <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full shadow-[0_1px_1px] shadow-black/30 transition-transform duration-100 translate-x-[5px] will-change-transform data-[state=checked]:translate-x-[20px]" />
        </Switch.Root>
      </div>
    </>
  );
};

export default SwitchButton;
