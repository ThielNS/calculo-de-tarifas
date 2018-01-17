import React from 'react';
import MonthlyExpenses from "../../components/MonthlyExpenses";
import ListEquipments from "../../components/ListEquipments";

const MainPage = () => {
  return (
    <div className="container">
      <MonthlyExpenses />
      <ListEquipments />
    </div>
  )
};

export default MainPage;