interface RadioButtonProps {
  value: string;
  checked: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const RadioButtonInput = (props: RadioButtonProps) => {
  const { value, checked, onChange } = props;
  return (
    <div className="pr-4">
      <div className="flex items-center mr-4 mb-2">
        <input
          type="radio"
          className="opacity-0 absolute h-5 w-5 peer"
          value={value}
          checked={checked === value}
          onChange={onChange}
          id={`radio-${value}`}
        />
        <div className="bg-white border-2 rounded-full border-my-grey w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <svg
            className="fill-current hidden w-3 h-3 pointer-events-none"
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <g
                className="fill-current text-my-primary w-3 h-3"
                transform="translate(2.6 0)"
                fillRule="nonzero"
              >
                <path
                  d="m11.75 6c0-1.5877-0.64424-3.0252-1.6839-4.0661-1.0409-1.0397-2.4784-1.6839-4.0661-1.6839-1.5865 0-3.024 0.64423-4.0649 1.6839-1.0409 1.0409-1.6851 2.4784-1.6851 4.0661 0 1.5865 0.64423 3.024 1.6851 4.0649 1.0409 1.0409 2.4784 1.6851 4.0649 1.6851 1.5877 0 3.0252-0.64424 4.0661-1.6851 1.0397-1.0409 1.6839-2.4784 1.6839-4.0649z"
                  strokeWidth=".011735"
                />
              </g>
            </g>
          </svg>
        </div>
        <label
          htmlFor={`radio-${value}`}
          className="text-my-grey peer-checked:text-my-blue"
        >
          {value}
        </label>
      </div>
    </div>
  );
};

export default RadioButtonInput;
