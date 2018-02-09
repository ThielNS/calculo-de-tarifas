import React from 'react';
import { Row, Col } from 'antd';
import OptionsTable from "../../components/OptionsTable";
import ListEquipmentsContainer from "../../containers/ListEquipmentsContainer";
import MonthlyExpenditureContainer from "../../containers/MonthlyExpensesContainer";

import "./mainPage.less";

const MainPage = () => {
  return (
    <Row className="content-mainpage">
      <Col span={18} offset={3}>
        <div>
          <MonthlyExpenditureContainer />
          <OptionsTable />
        </div>
        <ListEquipmentsContainer />
      </Col>
    </Row>
  )
};

export default MainPage;