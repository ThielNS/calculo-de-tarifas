import React, { Component } from "react";
import { Select } from "antd";

class SelectEquipment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameEquipment: "",
      placeholder: "Inserir Equipamento",
      equipments: [],
      lock: false
    };
  }

  handleChange = value => {
    const { lock } = this.state;
    const { searchEquipments, handleChangeEquipment, getPower } = this.props;
    if (!this.state.power) {
      this.setState({
        power: 1
      });
    }

    if (!lock) {
      handleChangeEquipment(value, getPower());
    }

    this.setState({ nameEquipment: value });

    searchEquipments(value)
      .then(data => {
        if (data) {
          this.setState({ equipments: data, power: 1});
        } 
      })
      .catch(e => {
        console.log(e, "erro");
      });
  };

  handleSelect = async (value, option) => {
    await this.setState({ lock: true });

    const { power, nameEquipment } = option.props;
    const { handleChangeEquipment } = this.props;

    handleChangeEquipment(nameEquipment, power);

    await this.setState({
      nameEquipment: value,
      power:1
    });

    await this.setState({ lock: false });
  };

  renderOptions = () => {
    const { Option } = Select;
    const { equipments } = this.state;

    return equipments.map((item, index) => (
      <Option
        key={item.name}
        power={item.defaultPower}
        nameEquipment={item.name}
      >
        {`${item.name} | ${item.defaultPower}W`}
      </Option>
    ));
  };

  render() {
    const { nameEquipment, placeholder } = this.state;

    return (
      <Select
        mode="combobox"
        value={nameEquipment}
        placeholder={placeholder}
        className="select-equipment"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={true}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {this.renderOptions()}
      </Select>
    );
  }
}

export default SelectEquipment;
