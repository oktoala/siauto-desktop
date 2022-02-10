import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// import { IpcRendererEvent } from 'electron';
import React, { FormEvent, useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import {
  RiLockPasswordLine,
  RiSettings3Line,
  RiSettings3Fill,
} from 'react-icons/ri';
import FormInput from './components/FormInput';
import CheckBoxInput from './components/CheckboxInput';
import RadioButtonInput from './components/RadioButtonInput';
import Sidebar from './components/Sidebar';
import getDate from './lib/date';

const { ipcRenderer } = window.require('electron');

// interface DataColleger {
//   nim: string;
//   password: string;
//   semId: string | undefined;
//   nilai: (string | undefined)[];
//   cobaDulu: boolean;
// }

// const dataColleger: DataColleger = {
//   nim: '',
//   password: '',
//   nilai: [],
//   semId: '',
//   cobaDulu: false,
// };
/* Form Input */

const MainSection = () => {
  const [radioChecked, setRadioChecked] = useState(getDate.semester);
  const [semester, setSemester] = useState(getDate.semester);
  const [hasSidebar, setHasSidebar] = useState(false);
  // const [checkRequired, setCheckRequired] = useState(true);
  // const [response, setResponse] = useState({
  //   response: 'ga',
  //   variantAlert: 'secondary',
  // });
  // const [showAlert, setShowAlert] = useState(false);
  // const [loading, setLoading] = useState(false);

  const tahunAjar = `${getDate.year}/${getDate.year + 1}`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() !== false) {
      // setResponse({ response: 'Tunggu Sebentar', variantAlert: 'secondary' });
      // setShowAlert(true);
      // setLoading(true);
      console.log(event);

      // ipcRenderer.send('Coba', dataColleger);

      // ipcRenderer.on('res', (_event: IpcRendererEvent, arg: any) => {
      //   setResponse({ response: arg.response, variantAlert: arg.variantAlert });
      //   setLoading(false);
      // });
      // setResponse({ response: data.response, variantAlert: data.variantAlert });
    }
  };
  // function onClickCheckBtn(label: string) {
  //   /* Detect if the label found in the array */
  //   const index = dataColleger.nilai.indexOf(label);
  //   if (index !== -1) {
  //     dataColleger.nilai.splice(index, 1);
  //   } else {
  //     dataColleger.nilai.push(label);
  //   }

  //   dataColleger.nilai.sort();

  //   if (dataColleger.nilai.length !== 0) {
  //     setCheckRequired(false);
  //     return;
  //   }
  //   setCheckRequired(true);
  // }

  const radioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioChecked(e.target.value);
    setSemester(e.target.value);
  };

  return (
    <main className="flex overflow-hidden">
      <Sidebar active={hasSidebar}>
        <h5 className="font-medium text-lg text-my-blue">Nilai Kuesioner</h5>
        <div className="flex py-2">
          <CheckBoxInput value="1" />
          <CheckBoxInput value="2" />
          <CheckBoxInput value="3" checked />
          <CheckBoxInput value="4" checked />
          <CheckBoxInput value="5" checked />
        </div>
        <h5 className="font-medium text-lg text-my-blue">Semester</h5>
        <div className="flex py-2">
          <RadioButtonInput
            value="Ganjil"
            checked={radioChecked}
            onChange={radioChange}
          />
          <RadioButtonInput
            value="Genap"
            checked={radioChecked}
            onChange={radioChange}
          />
        </div>
      </Sidebar>
      <section className="w-full h-screen ">
        <div className="flex items-center h-screen justify-center">
          <div>
            <h2 className="font-bold uppercase text-center text-2xl text-my-blue">{`Semester ${tahunAjar} ${semester}`}</h2>
            <form action="" onSubmit={handleSubmit}>
              <FormInput
                label="NIM"
                icon={<IoPersonCircleOutline />}
                type="text"
              />
              <FormInput
                label="Password SIA/Mols"
                icon={<RiLockPasswordLine />}
                type="password"
              />
              <div className="flex py-2">
                <CheckBoxInput value="Isi Satu Dulu" checked />
              </div>
              <div className="flex justify-center py-2">
                <button
                  type="submit"
                  className=" w-full bg-my-blue text-white font-semibold rounded-full h-9 text-center"
                >
                  Let&apos;s Go!
                </button>
              </div>
              <div className="flex justify-center py-2">
                {!hasSidebar ? (
                  <RiSettings3Line
                    onClick={() => setHasSidebar(!hasSidebar)}
                    className="z-20 bottom-4 left-4 absolute w-5 h-5 cursor-pointer fill-current text-my-blue"
                  />
                ) : (
                  <RiSettings3Fill
                    onClick={() => setHasSidebar(!hasSidebar)}
                    className="z-20 bottom-4 left-4 absolute w-5 h-5 cursor-pointer fill-current text-my-blue"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
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
