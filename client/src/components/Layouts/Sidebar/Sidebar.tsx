import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <div>Sidebar</div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
