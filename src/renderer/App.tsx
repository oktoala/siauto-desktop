/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// import { IpcRendererEvent } from 'electron';
import React, { useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { RiLockPasswordLine } from 'react-icons/ri';
import FormInput from './components/FormInput';
import CheckBoxInput from './components/CheckboxInput';
import RadioButtonInput from './components/RadioButtonInput';
import currYears from './lib/date';

const { ipcRenderer } = window.require('electron');

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

const MainSection = () => {
  const [checked, setChecked] = useState('');
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

      // ipcRenderer.send('Coba', dataColleger);

      // ipcRenderer.on('res', (_event: IpcRendererEvent, arg: any) => {
      //   setResponse({ response: arg.response, variantAlert: arg.variantAlert });
      //   setLoading(false);
      // });
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

  const radioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.value);
    setSemester(e.target.value);
  };

  return (
    <section className="main-section relative h-screen font-sans overflow-hidden flex justify-center items-center">
      <div>
        <h2 className="font-bold uppercase text-center text-2xl text-my-blue">{`Semester ${tahunAjar} ${semester}`}</h2>
        <form action="" onSubmit={handleSubmit}>
          <FormInput label="NIM" icon={<IoPersonCircleOutline />} type="text" />
          <FormInput
            label="Password SIA/Mols"
            icon={<RiLockPasswordLine />}
            type="password"
          />
          <h5 className="font-medium text-lg text-my-blue">Nilai Kuesioner</h5>
          <div className="flex py-2">
            <CheckBoxInput value="1" />
            <CheckBoxInput value="2" />
            <CheckBoxInput value="3" />
            <CheckBoxInput value="4" />
            <CheckBoxInput value="5" />
          </div>
          <h5 className="font-medium text-lg text-my-blue">Semester</h5>
          <div className="flex py-2">
            <RadioButtonInput
              value="Ganjil"
              checked={checked}
              onChange={radioChange}
            />
            <RadioButtonInput
              value="Genap"
              checked={checked}
              onChange={radioChange}
            />
          </div>
          <div className="flex py-2">
            <CheckBoxInput value="Isi Satu Dulu" />
          </div>
          <div className="flex justify-center py-2">
            <button
              type="submit"
              className=" w-32 bg-my-blue text-white font-semibold rounded-xl h-9 text-center"
            >
              Let&apos;s Go!
            </button>
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
      </div>
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
