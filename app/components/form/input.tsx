import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  label: string;
  name: string;
  kind?: 'text';
  type: string;
  register?: UseFormRegisterReturn;
  required: boolean;
  placeholder?: string;
  labelType?: 'declarative' | 'question';
}

export default function Input({
  name,
  kind = 'text',
  register,
  type,
  required,
  label,
  labelType = 'question',
}: InputProps) {
  return (
    <div>
      {kind === 'text' ? (
        <div className="form-control w-full max-w-lg">
          <label className="label">
            <span className="label-text text-lg">
              {labelType === 'question'
                ? `What is your ${name}?`
                : `Please enter your ${name}`}
            </span>
            <span className="label-text-alt"></span>
          </label>
          <input
            type={type}
            id={name}
            required={required}
            placeholder={label}
            className="input input-bordered w-full text-lg max-w-lg input-primary rounded-lg shadow-sm focus:bg-sky-200"
            {...register}
          />
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt"></span>
          </label>
        </div>
      ) : null}
    </div>
  );
}
