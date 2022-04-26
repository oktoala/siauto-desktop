import CheckBoxInput from './CheckboxInput';
import RadioButtonInput from './RadioButtonInput';
import Sidebar from './Sidebar';

interface PreferencesProps {
  hasSidebar: boolean;
  radioChecked: string;
  radioChange: React.ChangeEventHandler;
}

const Preferences = (props: PreferencesProps) => {
  const arrayNumber = ['3', '4', '5'];
  const { hasSidebar, radioChecked, radioChange } = props;
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

  const handleInput = (e: any) => {
    const number = e.target.value;
    const index = arrayNumber.indexOf(number);

    if (index !== -1) {
      arrayNumber.splice(index, 1);
    } else {
      arrayNumber.push(number);
    }

    console.log(arrayNumber);
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
