import React, { Component } from 'react';
import { Icon, Select } from "antd";
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
       textSearch: '',
       placeholder: `Inserir Equipamento`,
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

    const { inputNumber } = this.props;
    const { timeOfUse, textSearch, placeholder } = this.state;

    return (
      <div className="add-equipments">
        <Select
          mode="combobox"
          value={textSearch}
          placeholder={placeholder}
          style={{width: '150px'}}
          className="_margin-right"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onChange={this.handleChange}
        >
          {this.renderOptions}
        </Select>
        <span className="_margin-right">
          {inputNumber(0, 'power')}
        </span>
        <span className="_margin-right">
          {inputNumber(1, 'quantity')}
        </span>
        <span className="_margin-right">
          <span className="time _padding-small-right">
          {timeOfUse}
          </span>
          <Icon type="calendar" className="_padding-small-left"/>
        </span>
      </div>
    );
  }
}

export default AddEquipment;