import React, { useState } from "react";

import "../../assets/styles/pages/auth.css";

// alike pages
import Register from "../../pages/Register.page.jsx";

const AddUser = ({ buttonText, title, selectedTab }) => {
  console.log(selectedTab);
  const [actionIndex, setActionIndex] = useState(0);

  const addUserAdmin = () => {
    console.log("Add user admin");
    setActionIndex(0);
  };

  const addVehicleAdmin = () => {
    console.log("Add vehicle admin");
    setActionIndex(1);
  };

  const actionsDefinition = [
    {
      action: addUserAdmin,
    },
    {
      action: addVehicleAdmin,
    },
  ];

  return (
    <div className="add__user">
      <Register dashboardView={true} buttonText={buttonText} title={title} actionToBePerformed={actionsDefinition[actionIndex]} />
    </div>
  );
};

export default AddUser;
