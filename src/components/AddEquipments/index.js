import React, { Component } from 'react';
import { Col, Icon, Row, Select } from "antd";
import './addEquipments.less';

class AddEquipments extends Component {

  constructor(props) {
    super(props);
     this.state = {
       id: '1',
       equipments: [],
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

    console.log(value)

    const { searchEquipments } = this.props;
    this.setState({ textSearch: value });

    searchEquipments(value)
      .then(({data}) => {
        this.setState({ equipments: data})
      })
  };

  render() {

    const { inputNumber, formattNumber } = this.props;
    const { equipments, timeOfUse, textSearch, placeholder, whiteTariff, conventionalTariff } = this.state;

    const { Option } = Select;

    const options = equipments.map((item, index) => (
      <Option key={item.name}>{item.name}</Option>
    ));

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
            {options}
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

export default AddEquipments;