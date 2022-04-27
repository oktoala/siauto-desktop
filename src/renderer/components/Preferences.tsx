import { useState, useEffect } from 'react';
import CheckBoxInput from './CheckboxInput';
import RadioButtonInput from './RadioButtonInput';
import Sidebar from './Sidebar';

const { ipcRenderer } = window.require('electron');

interface PreferencesProps {
  hasSidebar: boolean;
  radioChecked: string;
  onClick: React.ChangeEventHandler | undefined;
  radioChange: React.ChangeEventHandler;
}

const Preferences = (props: PreferencesProps) => {
  const { hasSidebar, radioChecked, radioChange, onClick } = props;
  const [browser, setBrowser] = useState('Makan');

  useEffect(() => {
    console.log('Heheheh');
    ipcRenderer.send('GetBrowser', 'ahahh');
    ipcRenderer.on(
      'Browser',
      (_event: Electron.IpcRendererEvent, args: any) => {
        console.log('Hahahhah');
        setBrowser(args);
      }
    );
  }, []);
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
      <div className="flex py-2">
        <p>{browser}</p>
      </div>
    </Sidebar>
  );
};

export default Preferences;
