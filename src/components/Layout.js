import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  console.log(location);

  return (
    <div id="Layout">
      <Outlet />
    </div>
  );
};

export default Home;
