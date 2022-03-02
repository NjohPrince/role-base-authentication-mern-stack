import React from "react";
import { Link } from "react-router-dom";

// styles import
import "../assets/styles/pages/home.css";

// components import
import Navbar from "../components/navbar/Navbar.jsx";

const Home = () => {
  return (
    <div>
      <Navbar containMenuItems={true} />
      <div className="home__page flex flex-column a-j-center">
        <div className="headline">
          <h1>Bring All Your Employees Together</h1>
        </div>
        <div className="tagline">
          <h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            optio corrupti nihil tempora deleniti reprehenderit voluptas ipsum.
            Nemo, tenetur reiciendis.
          </h3>
        </div>
        <div className="call__to__action">
          <Link to="/auth/register">
            <button>Register Now!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
