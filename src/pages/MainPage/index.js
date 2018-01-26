import React from 'react';
import { Row, Col } from 'antd';
import OptionsTable from "../../components/OptionsTable";
import ListEquipmentsContainer from "../../containers/ListEquipmentsContainer";
import MonthlyExpenditureContainer from "../../containers/MonthlyExpensesContainer";

const MainPage = () => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <MonthlyExpenditureContainer />
        <OptionsTable />
        <ListEquipmentsContainer />
      </Col>
    </Row>
  )
};

export default MainPage;