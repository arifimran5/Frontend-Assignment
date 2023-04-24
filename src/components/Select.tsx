// import { useState } from "react";
import { cn } from "../utils/cn";
import { Option } from "../types";

const Select = ({
  options,
  label,
  required,
  immutable,

  name,
}: {
  options: Option[];
  defaultValue: string;
  label: string;
  required: boolean;
  immutable: boolean;
  name: string;
}) => {
  // const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex items-center gap-4">
      <h2 className="flex">
        {label} <span className="text-red-500">{required ? "*" : ""}</span>{" "}
      </h2>
      <select
        name={name}
        disabled={immutable}
        required={required}
        // onChange={(e) => {
        //   setValue(e.target.value);
        // }}
        id="countries"
        className={cn(
          "block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500",
          immutable ? "bg-gray-200 cursor-not-allowed" : ""
        )}
      >
        {options.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
