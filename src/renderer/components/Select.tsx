interface DataSelect {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  dataBrowser: DataBrowser;
}

interface DataBrowser {
  browserExe: string[];
  browserProfile: string[];
  browserName: string[];
}

const Select = (props: DataSelect) => {
  const { onClick, dataBrowser } = props;
  return (
    <div className="flex-auto flex flex-col items-center h-64">
      <div className="flex flex-col items-center relative">
        <div className="w-full">
          <div className="my-2 bg-white p-1 flex border border-gray-200 rounded svelte-1l8159u">
            <div className="flex flex-auto flex-wrap" />
            <input
              value="Javascript"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800  svelte-1l8159u"
            />
            <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
              <button
                type="button"
                className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-up w-4 h-4"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-full z-40 w-full left-0 rounded max-h-[300px] overflow-y-auto svelte-5uyqqj">
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
                  <div className="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
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
      </div>
    </div>
  );
};

export default Select;
