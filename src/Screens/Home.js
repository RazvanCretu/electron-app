import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div>
      {/* <button onClick={() => navigate("search")}>Search</button> */}
      <Button variant="contained">Hello World</Button>
      <Link to="search">Search</Link>
    </div>
  );
};

export default Home;
