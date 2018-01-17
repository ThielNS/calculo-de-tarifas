import React from 'react';
import MonthlyExpenses from "../../components/MonthlyExpenses";
import { Row, Col } from 'antd';
import ListEquipments from "../../components/ListEquipments";

const MainPage = () => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <MonthlyExpenses />
        <ListEquipments />
      </Col>
    </Row>
  )
};

export default MainPage;