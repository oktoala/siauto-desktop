import { useState, useEffect } from 'react';
import CheckBoxInput from './CheckboxInput';
import RadioButtonInput from './RadioButtonInput';
import Select from './Select';
import Sidebar from './Sidebar';
import getDate from '../lib/date';

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
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
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

  useEffect(() => {
    if (load) {
      ipcRenderer.send('SetBrowser', index);
    } else {
      setLoad(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (!hasSidebar) {
      setOpen(false);
    }
  }, [hasSidebar]);

  // function getIcon() {
  //   return <SiBrave />;
  // }

  const handleSelect: React.MouseEventHandler = (_event) => {
    const i = _event.currentTarget.attributes[1].value;
    setIndex(parseInt(i, 10));
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(!open);
  };

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
        {getDate.default !== 'Ganjil' && (
          <RadioButtonInput
            value="Genap"
            checked={radioChecked}
            onChange={radioChange}
          />
        )}
      </div>
      <h5 className="font-medium text-lg text-my-blue">Browser</h5>
      <div className="flex py-2">
        <Select
          onClick={handleSelect}
          dataBrowser={dataBrowser}
          index={index}
          open={open}
          onOpen={onOpen}
        />
      </div>
    </Sidebar>
  );
};

export default Preferences;
