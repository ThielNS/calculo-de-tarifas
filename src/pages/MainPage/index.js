import React from 'react';
import { Row, Col } from 'antd';
import ListEquipments from "../../components/ListEquipments";

const MainPage = () => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <ListEquipments/>
      </Col>
    </Row>
  )
};

export default MainPage;