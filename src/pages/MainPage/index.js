import React from 'react';
import { Row, Col } from 'antd';
import MonthlyExpenses from "../../components/MonthlyExpenses";
import OptionsTable from "../../components/OptionsTable";
import ListEquipmentsContainer from "../../containers/ListEquipmentsContainer";


const MainPage = () => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <MonthlyExpenses />
        <OptionsTable />
        <ListEquipmentsContainer />
      </Col>
    </Row>
  )
};

export default MainPage;