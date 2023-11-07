import { cls } from '@/lib/client/utils';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps {
  label?: string;
  name?: string;
  register?: UseFormRegisterReturn;
  required: boolean;
  placeholder?: string;
  colorType?: 'primary' | 'secondary' | 'accent';
}

export default function TextArea({
  label,
  name,
  register,
  colorType = 'primary',
  ...rest
}: TextAreaProps) {
  return (
    <section className="form-control text-3xl">
      {label ? (
        <label htmlFor={name} className="label mb-1 block font-medium">
          {<span className="label-text text-lg">{label}</span>}
        </label>
      ) : null}
      <textarea
        {...register}
        id={name}
        placeholder={label}
        className={cls(
          `textarea h-24 mt-1 shadow-md w-full rounded-md bg-primary bg-opacity-60 text-xl`,
          colorType === 'secondary'
            ? 'textarea-secondary'
            : colorType === 'accent'
            ? 'textarea-accent'
            : 'textarea-primary'
        )}
        rows={4}
        {...rest}
      />
    </section>
  );
}
