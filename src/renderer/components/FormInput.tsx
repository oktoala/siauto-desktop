import React, { useState } from 'react';

interface FormInputProps {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const FormInput = (props: FormInputProps) => {
  const [focus, setFocus] = useState('');
  const { icon, label, type, value, onChange } = props;

  return (
    <div
      className={`grid input-div border-b-2 relative my-5 py-1 focus:outline-none ${focus}`}
      style={{ gridTemplateColumns: '7% 93%' }}
    >
      <span
        className={`right-1/2 absolute bottom-[-2px] ${
          focus !== 'focus' ? 'w-0' : 'w-1/2'
        } h-[2px] bg-my-primary`}
        style={{ transition: '0.4s' }}
      >
        {' '}
      </span>
      <span
        className={`left-1/2 absolute bottom-[-2px] ${
          focus !== 'focus' ? 'w-0' : 'w-1/2'
        } h-[2px] bg-my-primary`}
        style={{ transition: '0.4s' }}
      >
        {' '}
      </span>
      <div className="i text-my-grey flex justify-center items-center">
        {icon}
      </div>
      <div className="div">
        <h5
          className={`font-sans absolute left-3 ${
            focus !== 'focus'
              ? 'top-1/2 text-my-grey text-lg'
              : 'top-[-5px] text-[15px] text-my-blue'
          } top-1/2 transform -translate-y-2/4   `}
          style={{ transition: '0.3s' }}
        >
          {label}
        </h5>
        <input
          required
          onFocus={() => setFocus('focus')}
          onBlur={() => {
            if (value === '') setFocus('');
          }}
          type={type}
          value={value}
          onChange={onChange}
          className="absolute w-full h-full py-2 px-3 outline-none inset-0 text-gray-700 "
          style={{ background: 'none' }}
        />
      </div>
    </div>
  );
};

export default FormInput;
