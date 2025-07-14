import React from 'react';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Controller,
  FieldValues,
  Control,
  Path,
} from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = '',
  type = 'text',
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className='label'>{label}</FormLabel>
        <FormControl>
          <Input className='input' {...field} placeholder={placeholder} type={type} />
        </FormControl>
        
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;
