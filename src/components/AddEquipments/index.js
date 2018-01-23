import React, { Component } from 'react';
import { Col, InputNumber, Row, Select } from "antd";
import './addEquipments.less';
import ColTimeOfUse from "../ColTimeOfUse";

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
       nameEquipment: '',
       placeholder: `Inserir item`,
       showModal: false,
     }
  }

  componentDidMount() {
    this.props.calculate();
  }
  
  handleTime = () => {

    this.props.calculate();
    console.log(this.props.calculate())
  }
  handleChange = (value) => {

    const { searchEquipments } = this.props;
    this.setState({ nameEquipment: value });

    searchEquipments(value)
      .then(({ data }) => {

        this.setState({ equipments: data })
      })
  };


  handleSelect = (value, option) => {

    const { power } = option.props;

    this.setState({
      nameEquipment: value,
      power
    })
  };


  inputNumber = (number, type) => {

    let { formatter } = this.props;
    formatter = (type === 'power') ? formatter : {};

    return (
      <InputNumber
        min={1}
        value={number}
        {...formatter}
        onChange={value => this.changeNumber(value, type)}
      />
    )
  };

  changeNumber = (value, type) => {
    if (type === 'quantity') {
      this.setState({ quantity: value })
    } else if (type === 'power') {
      this.setState({ power: value })
    }
  };

  render() {
    console.log(this.props.calculate())
    const { formattNumber } = this.props;

    const { equipments, timeOfUse, nameEquipment, power, quantity, placeholder, whiteTariff, conventionalTariff } = this.state;

    const { Option } = Select;

    const options = equipments.map((item, index) => (
      <Option
        key={item.name}
        power={item.defaultPower}
      >
        {`${item.name} | ${item.defaultPower}W`}
      </Option>
    ));

    return (
      <Row className="add-equipments">
        <Col span="5">
          <Select
            mode="combobox"
            value={nameEquipment}
            placeholder={placeholder}
            className="select-equipment _margin-right"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={true}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {options}
          </Select>
        </Col>
        <Col span="3" className="_margin-right">
          {this.inputNumber(power, 'power')}
        </Col>
        <Col span="3" className="_margin-right">
          {this.inputNumber(quantity, 'quantity')}
        </Col>

        <Col
          span="3"
          className="_margin-right"
        >
          <ColTimeOfUse
            timeOfUse={timeOfUse}
            nameEquipment={nameEquipment}
          />
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