import { SiGooglechrome, SiBrave, SiMicrosoftedge } from 'react-icons/si';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

interface DataSelect {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  dataBrowser: DataBrowser;
  index: number;
  open: boolean;
  onOpen: () => void;
}

interface DataBrowser {
  browserExe: string[];
  browserProfile: string[];
  browserName: string[];
}

const Select = (props: DataSelect) => {
  const { onClick, dataBrowser, index, open, onOpen } = props;
  const getLogo = () => {
    let icon;
    if (dataBrowser.browserName[index] === 'Chrome') {
      icon = <SiGooglechrome />;
    } else if (dataBrowser.browserName[index] === 'Brave') {
      icon = <SiBrave />;
    } else if (dataBrowser.browserName[index] === 'Edge') {
      icon = <SiMicrosoftedge />;
    }
    return icon;
  };
  return (
    <div className="flex-auto flex flex-col h-24">
      <div className="flex flex-col items-center relative">
        <div className="w-full">
          <div
            className={`my-2 bg-white w-full p-1 flex border ${
              open ? 'border-my-primary' : 'border-my-grey'
            }  rounded `}
          >
            <div className="flex flex-auto flex-wrap" />
            <div className="flex flex-row items-center p-1 px-2 outline-none w-full text-gray-800">
              {getLogo()}
              <p className="px-2">
                {dataBrowser.browserExe.length === 0
                  ? 'Browser Tidak Terdeteksi'
                  : dataBrowser.browserName[index]}
              </p>
            </div>
            <div className="text-gray-300 w-8 py-1 px-2 border-l flex items-center border-gray-200">
              <button
                type="button"
                onClick={onOpen}
                className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
              >
                {open ? (
                  <MdArrowDropUp size={24} />
                ) : (
                  <MdArrowDropDown size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
        {open && (
          <div className="absolute top-full w-full z-40 left-0 rounded max-h-[300px] overflow-y-auto">
            <div className="flex flex-col w-full">
              {dataBrowser.browserExe.map((e, i) => {
                return (
                  <div
                    onClick={onClick}
                    role="button"
                    tabIndex={i}
                    onKeyPress={() => {}}
                    className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                  >
                    <div className="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-my-blue hover:text-white hover:border-teal-600">
                      <div className="w-full items-center flex">
                        <div className="mx-2 leading-6" defaultValue={e}>
                          {dataBrowser.browserName[i]}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
