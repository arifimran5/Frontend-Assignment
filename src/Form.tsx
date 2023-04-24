import { Fragment, ReactNode, useState } from "react";
import { Option, UISchema, Validate } from "./types";
import SwitchButton from "./components/Switch";
import Select from "./components/Select";
import Radio from "./components/Radio";
import Input from "./components/Input";
import { cn } from "./utils/cn";

const Form = ({ data }: { data: UISchema[] }) => {
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  return (
    <>
      {data.map((d) => (
        <Fragment key={d.jsonKey + d.label}>
          {/* Element that are not ignore type */}
          {d.label !== "Type" && d.uiType !== "Ignore" && (
            <>
              <div
                className={cn(
                  "p-2 rounded-md",
                  "bg-gray-" + String(d.level > 0 ? d.level * 100 : 50)
                )}
              >
                {/* only show label if not switch, radio and select */}
                {d.uiType !== "Switch" &&
                  d.uiType !== "Radio" &&
                  d.uiType !== "Select" && (
                    <h1 className="mb-2">
                      {d.label}{" "}
                      <span className="text-red-500">
                        {d.validate.required ? "*" : ""}
                      </span>{" "}
                    </h1>
                  )}
                <FormElement
                  setSelectedRadioButton={setSelectedRadio}
                  type={d.uiType}
                  jsonKey={d.jsonKey}
                  label={d.label}
                  required={d.validate.required ? d.validate.required : false}
                  immutable={d.validate.immutable}
                  validate={d.validate}
                  options={d.validate.options && d.validate.options}
                  defaultValue={d.validate.options && d.validate.defaultValue}
                >
                  {/* if there are subElements then call the Form component for all the subelements and pass it as children */}
                  {d.subParameters && <Form data={d.subParameters} />}
                </FormElement>
              </div>
            </>
          )}
          {/* Element that are ignore type */}
          {/* render direct Ignore component */}
          {d.label !== "Type" && d.uiType === "Ignore" && d.conditions && (
            <Ignore selected={selectedRadio} value={d.conditions[0].value}>
              <div
                className={cn(
                  "p-2 rounded-md",
                  "bg-gray-" + String(d.level > 0 ? d.level * 200 : 100)
                )}
              >
                {d.subParameters && <Form data={d.subParameters} />}
              </div>
            </Ignore>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default Form;

type FormElementProps = {
  type: string;
  label: string;
  options?: Option[];
  defaultValue: string | boolean | undefined;
  validate: Validate;
  jsonKey: string;
  children?: ReactNode;
  required: boolean;
  immutable: boolean;
  setSelectedRadioButton: React.Dispatch<React.SetStateAction<string>>;
};

function FormElement(props: FormElementProps) {
  const {
    type,
    options,
    defaultValue,
    validate,
    label,
    children,
    required,
    immutable,
    jsonKey,
    setSelectedRadioButton,
  } = props;

  switch (type) {
    case "Input":
      return <Input name={jsonKey} required={required} immutable={immutable} />;
    case "Group":
      return <div className="flex flex-col gap-2">{children}</div>;
    case "Radio":
      if (!options) return null;
      if (typeof defaultValue !== "string") return null;
      return (
        <Radio
          name={jsonKey}
          required={required}
          immutable={immutable}
          setRadio={setSelectedRadioButton}
          options={options}
          defaultValue={defaultValue}
        />
      );
    case "Select":
      if (!options) return null;
      if (typeof defaultValue !== "string") return null;
      return (
        <Select
          name={jsonKey}
          required={required}
          immutable={immutable}
          options={options}
          label={label}
          defaultValue={defaultValue}
        />
      );
    case "Switch":
      if (typeof validate.defaultValue !== "boolean") return null;
      return (
        <SwitchButton
          name={jsonKey}
          required={required}
          immutable={immutable}
          label={label}
          defaultValue={validate.defaultValue}
        />
      );
    default:
      console.error("Not valid component");
      return null;
  }
}

function Ignore({
  children,
  value,
  selected,
}: {
  children: ReactNode;
  value: string;
  selected: string;
}) {
  const toShow = selected === value;
  return <div className="ignore">{toShow && children}</div>;
}
