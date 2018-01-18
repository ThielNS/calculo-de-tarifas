import React, { Component } from 'react';
import { Col, Input, Row, Table } from "antd";

class AddEquipment extends Component {
  render() {

    return (
      <Input type="number" min="1" value={1} placeholder="Basic usage" />
    );
  }
}

export default AddEquipment;