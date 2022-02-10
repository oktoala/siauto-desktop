import { RiCheckFill } from 'react-icons/ri';

const Alert = () => {
  return (
    <div
      className="bg-green-400 border-t-4 border-green-500 rounded-b px-4 py-3 mb-2 shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1 mr-2">
          <RiCheckFill className="w-8 h-8 fill-current text-gray-50" />
        </div>
        <div>
          <p className="uppercase font-bold text-my-blue">Berhasil!</p>
          <p className="text-sm">hahhahf</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
