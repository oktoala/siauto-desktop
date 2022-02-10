import { FunctionComponent } from 'react';

interface CheckboxProps {
  value: string;
  checked?: boolean;
}

const CheckBoxInput: FunctionComponent<CheckboxProps> = (props) => {
  const { value, checked } = props;
  return (
    <div className="pr-2 ">
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          className="opacity-0 absolute h-5 w-5 peer"
          value={value}
          defaultChecked={checked}
          id={`checkbox-${value}`}
          required
        />
        <div className="bg-white border-2 rounded-md border-my-grey w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2">
          <svg
            className="fill-current hidden w-3 h-3 pointer-events-none"
            version="1.1"
            viewBox="0 0 17 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <g
                className="fill-current text-my-primary"
                transform="translate(-8.2 -11)"
                fillRule="nonzero"
              >
                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
              </g>
            </g>
          </svg>
        </div>
        <label
          htmlFor={`checkbox-${value}`}
          className="text-my-grey peer-checked:text-my-blue"
        >
          {value}
        </label>
      </div>
    </div>
  );
};

CheckBoxInput.defaultProps = {
  checked: false,
};
export default CheckBoxInput;