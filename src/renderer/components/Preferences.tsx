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

  const handleInput = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <Sidebar active={hasSidebar}>
      <h5 className="font-medium text-lg text-my-blue">Nilai Kuesioner</h5>
      <div className="flex py-2">
        <CheckBoxInput value="1" onClick={handleInput} />
        <CheckBoxInput value="2" onClick={handleInput} />
        <CheckBoxInput value="3" onClick={handleInput} checked />
        <CheckBoxInput value="4" onClick={handleInput} checked />
        <CheckBoxInput value="5" onClick={handleInput} checked />
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
