export type UISchema = {
  sort: number;
  label: string;
  description: string;
  validate: Validate;
  jsonKey: string;
  uiType: string;
  icon: string;
  level: number;
  placeholder: string;
  conditions?: Condition[];
  subParameters?: UISchema[];
};

export type Condition = {
  jsonKey: string;
  op: string;
  value: string;
  action: string;
};

export type Validate = {
  required?: boolean;
  options?: Option[];
  defaultValue?: boolean | string;
  immutable: boolean;
  pattern?: string;
};

export type Option = {
  label: string;
  value: string;
  description: string;
  icon: string;
};
