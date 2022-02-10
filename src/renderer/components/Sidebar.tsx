interface SidebarProps {
  children: React.ReactNode;
  active: boolean | undefined;
}

const Sidebar = (props: SidebarProps) => {
  const { children, active } = props;
  return (
    <div
      className={`flex justify-center items-center overflow-hidden bg-gray-50 absolute  ${
        active ? 'w-full' : 'w-0'
      } h-screen py-8 border-r z-10 transtition ease-in duration-300`}
    >
      <div>
        <h2 className="uppercase text-center text-2xl font-semibold  text-my-blue">
          Preferensi
        </h2>
        <div className="flex flex-col justify-between mt-6">
          <aside>{children}</aside>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
