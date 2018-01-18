import React from 'react';
import { Row, Col } from 'antd';
import ListEquipments from "../../components/ListEquipments";
import MonthlyExpenses from "../../components/MonthlyExpenses";
import OptionsTable from "../../components/OptionsTable";


const MainPage = () => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <MonthlyExpenses />
        <OptionsTable />
        <ListEquipments />
      </Col>
    </Row>
  )
};

export default MainPage;