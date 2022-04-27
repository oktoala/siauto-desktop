import { useState, useEffect } from 'react';
// import { SiBrave } from 'react-icons/si';
import CheckBoxInput from './CheckboxInput';
import RadioButtonInput from './RadioButtonInput';
import Select from './Select';
import Sidebar from './Sidebar';

interface DataBrowser {
  browserExe: string[];
  browserProfile: string[];
  browserName: string[];
}
const { ipcRenderer } = window.require('electron');

interface PreferencesProps {
  hasSidebar: boolean;
  radioChecked: string;
  onClick: React.ChangeEventHandler | undefined;
  radioChange: React.ChangeEventHandler;
}

const Preferences = (props: PreferencesProps) => {
  const { hasSidebar, radioChecked, radioChange, onClick } = props;
  const [dataBrowser, setDataBrowser] = useState<DataBrowser>({
    browserExe: [],
    browserProfile: [],
    browserName: [],
  });

  useEffect(() => {
    ipcRenderer.send('GetBrowser', 'ahahh');
    ipcRenderer.on(
      'Browser',
      (_event: Electron.IpcRendererEvent, args: DataBrowser) => {
        setDataBrowser(args);
      }
    );
  }, []);

  // function getIcon() {
  //   return <SiBrave />;
  // }

  // const handleExe = () => {
  //   ipcRenderer.send('ChangeExe', browser);
  // };
  return (
    <Sidebar active={hasSidebar}>
      <h5 className="font-medium text-lg text-my-blue">Nilai Kuesioner</h5>
      <div className="flex py-2">
        <CheckBoxInput value="1" onClick={onClick} />
        <CheckBoxInput value="2" onClick={onClick} />
        <CheckBoxInput value="3" onClick={onClick} checked />
        <CheckBoxInput value="4" onClick={onClick} checked />
        <CheckBoxInput value="5" onClick={onClick} checked />
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
      <h5 className="font-medium text-lg text-my-blue">Browser</h5>
      <div className="flex py-2">
        <Select onClick={() => {}} dataBrowser={dataBrowser} />
      </div>
      {console.log(dataBrowser)}
    </Sidebar>
  );
};

export default Preferences;
