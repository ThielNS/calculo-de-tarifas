import React, { Component } from "react";
import { Col, InputNumber, Row, Select } from "antd";
import "./addEquipments.less";
import ColTimeOfUse from "../ColTimeOfUse";

class AddEquipments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments: [],
      nameEquipment: "",
      power: 0,
      quantity: 1,
      timeOfUse: "00:00",
      useOfMonth: [],
      whiteTariff: "-",
      conventionalTariff: "-",
      placeholder: `Inserir item`,
      send: false
    };
  }

  componentDidUpdate() {
    const { nameEquipment, power, quantity, useOfMonth, send } = this.state;
    const { addEquipment } = this.props;

    if (
      nameEquipment &&
      power > 0.01 &&
      quantity >= 1 &&
      useOfMonth.length > 0 &&
      send
    ) {
      const dataInfo = {
        nameEquipment: nameEquipment,
        power: power,
        quantity: quantity,
        date: {
          useOfMonth: useOfMonth
        }
      };

      addEquipment(dataInfo);

      localStorage.getItem('monthIndex');
      console.log(localStorage.getItem('monthIndex'))

      this.setState({
        nameEquipment: "",
        power: 0,
        quantity: 1,
        useOfMonth: [],
        send: !send
      });
    }
  }

  addUseOfMonth = date => {
    let { useOfMonth } = this.state;

    useOfMonth.push(date);

    this.setState({
      useOfMonth
    });
  };

  handleChange = value => {
    const { searchEquipments } = this.props;
    this.setState({ nameEquipment: value });

    searchEquipments(value)
      .then(data => {
        this.setState({ equipments: data });
      })
      .catch(e => {
        console.log(e, "erro");
      });
  };

  handleSelect = (value, option) => {
    const { power } = option.props;

    this.setState({
      nameEquipment: value,
      power
    });
  };

  inputNumber = (number, type) => {
    let { formatter } = this.props;
    formatter = type === "power" ? formatter : {};

    return (
      <InputNumber
        min={1}
        value={number}
        {...formatter}
        onChange={value => this.changeNumber(value, type)}
      />
    );
  };

  changeNumber = (value, type) => {
    if (type === "quantity") {
      this.setState({ quantity: value });
    } else if (type === "power") {
      this.setState({ power: value });
    }
  };

  submitData = () => {
    this.setState(state => ({
      send: !state.send
    }));
  };

  render() {
    const {
      equipments,
      timeOfUse,
      nameEquipment,
      power,
      quantity,
      useOfMonth,
      placeholder,
      whiteTariff,
      conventionalTariff
    } = this.state;

    const { Option } = Select;

    const options = equipments.map((item, index) => (
      <Option key={item.name} power={item.defaultPower}>
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
          {this.inputNumber(power, "power")}
        </Col>
        <Col span="3" className="_margin-right">
          {this.inputNumber(quantity, "quantity")}
        </Col>

        <Col span="3" className="_margin-right">
          <ColTimeOfUse
            timeOfUse={timeOfUse}
            nameEquipment={nameEquipment}
            useOfMonth={useOfMonth}
            addUseOfMonth={this.addUseOfMonth}
            submitData={this.submitData}
          />
        </Col>
        <Col span="2" className="price _margin-right">
          {whiteTariff}
        </Col>
        <Col span="4" className="price _margin-right">
          {conventionalTariff}
        </Col>
      </Row>
    );
  }
}

export default AddEquipments;
