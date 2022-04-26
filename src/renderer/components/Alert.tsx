import { RiCheckFill, RiCloseFill, RiTimeLine } from 'react-icons/ri';
import { FaExclamationCircle } from 'react-icons/fa';

interface AlertProps {
  status: string;
  header: React.ReactNode;
  text: React.ReactNode;
  hidden: boolean;
  onClick: React.MouseEventHandler;
}

const Alert = (props: AlertProps) => {
  const { status, header, text, hidden, onClick } = props;

  const getStatus = () => {
    let statusTemp;
    if (status === 'success') {
      statusTemp = 'bg-green-400 border-green-500';
    } else if (status === 'failed') {
      statusTemp = 'bg-red-400 border-red-500';
    } else if (status === 'run') {
      statusTemp = 'bg-gray-400 border-gray-500';
    }
    return statusTemp;
  };

  const getLogo = () => {
    let comp;
    if (status === 'success') {
      comp = <RiCheckFill className="w-8 h-8 fill-current text-gray-50" />;
    } else if (status === 'failed') {
      comp = (
        <FaExclamationCircle className="w-8 h-8 fill-current text-gray-50" />
      );
    } else if (status === 'run') {
      comp = <RiTimeLine className="w-8 h-8 fill-current text-gray-50" />;
    }
    return comp;
  };

  return (
    <div
      className={`${getStatus()} relative border-t-4 rounded-b px-4 py-3 mb-2 shadow-md ${
        hidden ? 'hidden' : ''
      }`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1 mr-2">{getLogo()}</div>
        <div>
          <RiCloseFill
            className={` ${
              status === 'run' ? 'hidden' : ''
            } absolute right-4 w-5 h-5`}
            onClick={onClick}
          />
          <p className="uppercase font-bold text-my-blue">{header}</p>
          <p className="text-sm text-my-blue">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
