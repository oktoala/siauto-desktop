/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import { FormCheckType } from 'react-bootstrap/esm/FormCheck';
import { IoPersonCircle } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';

const { ipcRenderer } = window.require('electron');

interface Props {
  children?: React.ReactNode;
  type?: FormCheckType | undefined;
  label?: string;
  required?: boolean;
  hidden?: string;
  href?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
}

// interface Checkbox {
//   children?: React.ReactNode;
// }

interface DataColleger {
  nim: string;
  password: string;
  semId: string | undefined;
  nilai: (string | undefined)[];
  cobaDulu: boolean;
}

const dataColleger: DataColleger = {
  nim: '',
  password: '',
  nilai: [],
  semId: '',
  cobaDulu: false,
};
/* Form Input */

const FormForInput = (props: Props) => {
  const [focus, setFocus] = useState('');
  const [value, setValue] = useState('');

  return (
    <div
      className={`grid input-div border-b-2 relative my-5 py-1 focus:outline-none ${focus}`}
      style={{ gridTemplateColumns: '7% 93%' }}
    >
      <div className="i">{props.icon}</div>
      <div className="div">
        <h5
          className="font-sans absolute left-3 top-1/2 transform -translate-y-2/4 text-my-grey text-lg "
          style={{ transition: '0.3s' }}
        >
          {props.label}
        </h5>
        <input
          required
          onFocus={() => setFocus('focus')}
          onBlur={() => {
            if (value === '') setFocus('');
          }}
          type={props.hidden}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="absolute w-full h-full py-2 px-3 outline-none inset-0 text-gray-700 "
          style={{ background: 'none' }}
        />
      </div>
    </div>
  );
};

const CheckBox = () => {
  return (
    <div className="pr-4">
      <div className="flex items-center mr-4 mb-2">
        <input
          type="checkbox"
          id="A3-yes"
          name="A3-confirmation"
          value="yes"
          className="opacity-0 absolute h-5 w-5"
        />
        <div className="bg-white border-2 rounded-md border-my-grey w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
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
        <label htmlFor="A3-yes" className="select-none">
          1
        </label>
      </div>
    </div>
  );
};

const MainSection = () => {
  const [checkRequired, setCheckRequired] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [semester, setSemester] = useState('');
  const [response, setResponse] = useState({
    response: 'ga',
    variantAlert: 'secondary',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // eslint-disable-next-line no-console
  console.log(`${checkRequired}, ${response}, ${showAlert}, ${loading} `);

  function currYears() {
    const today = new Date();
    const monthGanjil = ['8', '9', '10', '11', '12'];
    const january = '1';
    const monthGenap = ['2', '3', '4', '5', '6', '7'];

    // Get year
    const year = today.getFullYear();

    // Get month
    const month = (today.getMonth() + 1).toString();
    let currYear = year;

    if (month === january) {
      currYear = year - 1;
    } else if (monthGanjil.includes(month)) {
      currYear = year;
    } else if (monthGenap.includes(month)) {
      currYear = year - 1;
    }

    return currYear;
  }

  const tahunAjar = `${currYears()}/${currYears() + 1}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() !== false) {
      setResponse({ response: 'Tunggu Sebentar', variantAlert: 'secondary' });
      setShowAlert(true);
      setLoading(true);
      dataColleger.nim = (
        document.querySelector('#basicFormNIM') as HTMLInputElement
      ).value;
      dataColleger.password = (
        document.querySelector('#basicFormPassword') as HTMLInputElement
      ).value;

      ipcRenderer.send('Coba', dataColleger);

      ipcRenderer.on('res', (_event: any, arg: any) => {
        setResponse({ response: arg.response, variantAlert: arg.variantAlert });
        setLoading(false);
      });
      // setResponse({ response: data.response, variantAlert: data.variantAlert });
    }
  }
  function onClickCheckBtn(label: string) {
    /* Detect if the label found in the array */
    const index = dataColleger.nilai.indexOf(label);
    if (index !== -1) {
      dataColleger.nilai.splice(index, 1);
    } else {
      dataColleger.nilai.push(label);
    }

    dataColleger.nilai.sort();

    if (dataColleger.nilai.length !== 0) {
      setCheckRequired(false);
      return;
    }
    setCheckRequired(true);
  }

  return (
    <section className="main-section">
      <h3 className="font-bold uppercase text-center text-lg">{`Semester ${tahunAjar} ${semester}`}</h3>
      <form action="" onSubmit={handleSubmit}>
        <FormForInput label="NIM" icon={<IoPersonCircle />} hidden="text" />
        <FormForInput
          label="Password SIA/Mols"
          icon={<RiLockPasswordFill />}
          hidden="password"
        />
        <div className="flex py-2">
          <CheckBox />
          <CheckBox />
          <CheckBox />
          <CheckBox />
          <CheckBox />
        </div>
        <input
          type="checkbox"
          name="radio"
          onClick={() => setSemester('makan')}
        />
        <input
          type="checkbox"
          name="radio"
          onClick={() => onClickCheckBtn('1')}
        />
      </form>
    </section>
  );
};

// ! COMPONENT

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainSection} />
        {ipcRenderer.send('Open', true)}
      </Switch>
    </Router>
  );
}
