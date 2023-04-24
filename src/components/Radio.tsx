import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Option } from "../types";

const Radio = ({
  setRadio,
  options,
  defaultValue,
  required,
  immutable,
  name,
}: {
  setRadio: React.Dispatch<React.SetStateAction<string>>;
  options: Option[];
  defaultValue: string;
  required: boolean;
  immutable: boolean;
  name: string;
}) => {
  const [checkedValue, setCheckedValue] = useState(() => {
    return defaultValue;
  });
  useEffect(() => {
    setRadio(defaultValue);
  }, [defaultValue, setRadio]);

  if (!options) return null;

  return (
    <ul className="items-center w-full text-sm font-medium bg-white border border-gray-200 rounded-md sm:flex ">
      {options.map((d) => (
        <li
          key={d.value}
          className={cn(
            "w-full rounded-md border-b border-gray-100 sm:border-b-0 sm:border-r",
            checkedValue === d.value
              ? "bg-blue-700 text-gray-50"
              : "text-gray-900"
          )}
        >
          <div className="flex pl-3">
            <label
              htmlFor={d.label}
              className="w-full py-3 ml-2 text-sm font-medium focus:ring-2"
            >
              <input
                name={name}
                disabled={immutable}
                required={required}
                id={d.label}
                type="radio"
                checked={checkedValue == d.value}
                value={d.value}
                onChange={() => {
                  setCheckedValue(d.value);
                  setRadio(d.value);
                }}
                className={cn(
                  "hidden",
                  immutable ? "bg-gray-200 cursor-not-allowed" : ""
                )}
              />

              {d.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Radio;
