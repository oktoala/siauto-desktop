import { RiCheckFill, RiCloseFill } from 'react-icons/ri';

interface AlertProps {
  status: string;
  header: React.ReactNode;
  text: React.ReactNode;
  display: string;
  onClick: React.MouseEventHandler;
}

const Alert = (props: AlertProps) => {
  const { status, header, text, display, onClick } = props;

  return (
    <div
      className={`${
        status === 'success'
          ? 'bg-green-400 border-green-500'
          : 'bg-red-400 border-red-500'
      } relative border-t-4 rounded-b px-4 py-3 mb-2 shadow-md ${display}`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1 mr-2">
          <RiCheckFill className="w-8 h-8 fill-current text-gray-50" />
        </div>
        <div>
          <RiCloseFill className="absolute right-4 w-5 h-5" onClick={onClick} />
          <p className="uppercase font-bold text-my-blue">{header}</p>
          <p className="text-sm text-my-blue">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
