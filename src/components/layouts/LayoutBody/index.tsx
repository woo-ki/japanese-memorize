import { Outlet } from 'react-router-dom';

const LayoutBody = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default LayoutBody;
