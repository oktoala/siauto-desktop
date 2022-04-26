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
import Alert from './components/Alert';
import Preferences from './components/Preferences';
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
  const [nim, setNim] = useState('');
  const [passwd, setPasswd] = useState('');
  const [radioChecked, setRadioChecked] = useState(getDate.semester);
  const [semester, setSemester] = useState(getDate.semester);
  const [hasSidebar, setHasSidebar] = useState(false);
  const tahunAjar = `${getDate.year}/${getDate.year + 1}`;
  const [isRun, setIsRun] = useState(false);

  const [alert, setAlert] = useState({
    status: 'success',
    header: 'Berhasill!!',
    text: 'Kuesioner berhasil diisi',
    hidden: false,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() !== false) {
      setAlert({
        status: 'run',
        header: 'Tunggu Sebentar',
        text: 'Masih Dikerjain',
        hidden: false,
      });
      setIsRun(true);
      // ipcRenderer.send('Coba', dataColleger);
      // ipcRenderer.on('res', (_event: IpcRendererEvent, arg: any) => {
      //   setResponse({ response: arg.response, variantAlert: arg.variantAlert });
      //   setLoading(false);
      // });
      // setResponse({ response: data.response, variantAlert: data.variantAlert });
    }
  };

  const radioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioChecked(e.target.value);
    setSemester(e.target.value);
  };

  return (
    <main className="flex overflow-hidden">
      <Preferences
        hasSidebar={hasSidebar}
        radioChange={radioChange}
        radioChecked={radioChecked}
      />
      <section className="w-full h-screen ">
        <div className="flex items-center h-screen justify-center">
          <div>
            <Alert
              status={alert.status}
              header={alert.header}
              text={alert.text}
              hidden={alert.hidden}
              onClick={() => setAlert({ ...alert, hidden: true })}
            />
            <h2 className="font-bold uppercase text-center text-2xl text-my-blue">{`Semester ${tahunAjar} ${semester}`}</h2>
            <form action="" onSubmit={handleSubmit}>
              <FormInput
                label="NIM"
                icon={<IoPersonCircleOutline />}
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
              <FormInput
                label="Password SIA/Mols"
                icon={<RiLockPasswordLine />}
                type="password"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
              />
              <div className="flex py-2">
                <CheckBoxInput value="Isi Satu Dulu" checked />
              </div>
              <div className="flex justify-center py-2">
                <button
                  disabled={isRun}
                  type="submit"
                  className={` w-full ${
                    isRun
                      ? 'bg-my-grey cursor-default'
                      : 'bg-my-blue hover:brightness-125'
                  }  text-white font-semibold rounded-full h-9 text-center `}
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
