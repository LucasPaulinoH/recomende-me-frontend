import { ReactNode } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface FormInputProps {
  name: string;
  label: string;
  children: (field: any) => ReactNode;
  control: Control<any, any>;
}

const FormInput = (props: FormInputProps) => {
  const { name, label, children, control } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
