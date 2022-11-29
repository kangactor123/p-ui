import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

export type Translation = (key: string, option?: any) => string;
export type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<RegisterOptions<T>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

export type TSize = {
  size?: 'small' | 'medium' | 'large' | string;
};
