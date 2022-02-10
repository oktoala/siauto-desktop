import CheckBoxInput from './CheckboxInput';
import RadioButtonInput from './RadioButtonInput';
import Sidebar from './Sidebar';

interface PreferencesProps {
  hasSidebar: boolean;
  radioChecked: string;
  radioChange: React.ChangeEventHandler;
}

const Preferences = (props: PreferencesProps) => {
  const { hasSidebar, radioChecked, radioChange } = props;
  return (
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
  );
};

export default Preferences;
