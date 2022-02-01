interface SidebarProps {
  children: React.ReactNode;
  active: boolean | undefined;
}

const Sidebar = (props: SidebarProps) => {
  const { children, active } = props;
  return (
    <div
      className={`absolute md:relative flex flex-col ${
        active ? 'w-auto mx-4' : 'w-0'
      } h-screen py-8 overflow-y-auto border-r`}
    >
      <h2 className="text-3xl font-semibold  text-my-blue">Settings</h2>
      <div className="flex flex-col justify-between mt-6">
        <aside>{children}</aside>
      </div>
    </div>
  );
};

export default Sidebar;
