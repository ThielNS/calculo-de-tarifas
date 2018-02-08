import React, { Component } from "react";
import { Select } from "antd";

class SelectEquipment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameEquipment: "",
      placeholder: 'Inserir Equipamento',
      equipments: []
    };
  }

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
    const { power, nameEquipment } = option.props;
    const { handleChangeEquipment } = this.props;

    handleChangeEquipment(power, nameEquipment);
    
    this.setState({
      nameEquipment: value
    });
  };

  renderOptions = () => {
    const { Option } = Select;
    const { equipments } = this.state;

    return equipments.map((item, index) => (
      <Option key={item.name} power={item.defaultPower} nameEquipment={item.name}>
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
