import React, { Component } from 'react';
import { Button, Col, Icon, Row, Select } from "antd";
import './addEquipments.less';

class AddEquipment extends Component {

  constructor(props) {
    super(props);
     this.state = {
       id: '1',
       equipments: [
         'Computador',
         'Liquidificador',
         'Microondas'
       ],
       power: 0,
       quantity: 1,
       timeOfUse: '00:00',
       whiteTariff: 0.00,
       conventionalTariff: 0.00,
       textSearch: '',
       placeholder: `Inserir item`,
     }
  }

  handleChange = (value) => {
    this.setState({ textSearch: value });
  };

  renderOptions = () => {

    const { equipments } = this.state;
    const { Option } = Select;

    return equipments.map((value, index) => (
      <Option key={index}>{value}</Option>
    ));
  };

  render() {

    const { inputNumber, formattNumber } = this.props;
    const { timeOfUse, textSearch, placeholder, whiteTariff, conventionalTariff } = this.state;

    return (
      <Row className="add-equipments">
        <Col span="5">
          <Select
            mode="combobox"
            value={textSearch}
            placeholder={placeholder}
            className="select-equipment _margin-right"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onChange={this.handleChange}
          >
            {this.renderOptions}
          </Select>
        </Col>
        <Col span="3" className="_margin-right">
          {inputNumber(0, 'power')}
        </Col>
        <Col span="3" className="_margin-right">
          {inputNumber(1, 'quantity')}
        </Col>
        <Col span="3" className="_margin-right">
          <span className="time _padding-small-right">
          {timeOfUse}
          </span>
          <Icon type="calendar" className="_padding-small-left"/>
        </Col>
        <Col span="2" className="price _margin-right">
          {formattNumber(whiteTariff)}
        </Col>
        <Col span="4" className="price _margin-right">
          {formattNumber(conventionalTariff)}
        </Col>
      </Row>
    );
  }
}

export default AddEquipment;