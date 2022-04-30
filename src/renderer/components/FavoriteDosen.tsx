/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
interface SwitchProps {
  toggle: boolean;
  onClick: () => void;
}

function Switch(props: SwitchProps) {
  const { toggle, onClick } = props;
  return (
    <div id="switch" className="flex items-center">
      <div
        className={`${
          toggle ? 'border-my-primary' : 'border-my-grey'
        } w-8 h-5 flex  items-center bg-transparent rounded-full p-1 cursor-pointer  border-2`}
        onClick={onClick}
      >
        <div
          className={`${
            toggle ? 'bg-my-primary' : 'bg-my-grey'
          }  h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out ${
            toggle ? 'transform translate-x-2' : null
          }`}
        />
      </div>
      <h5 className={`${toggle ? 'text-my-blue' : 'text-my-grey'} px-2`}>
        Aktifkan
      </h5>
    </div>
  );
}

export default Switch;
