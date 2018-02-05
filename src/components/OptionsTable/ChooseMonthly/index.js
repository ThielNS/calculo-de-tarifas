import React, { Component } from "react";
import { Select } from "antd";
import Moment from "moment";
import "moment/locale/pt-br";
import "./chooseMonthly.less";

const { Option } = Select;

class ChooseMonthly extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = value => {

    const { listEquipments, updateMonthEquipments, changeMonth } = this.props;

    changeMonth(value);
    updateMonthEquipments(listEquipments, value);

  };

  getMonths() {
    const m = new Moment();
    let listMonths = [];
    const { getMonth } = this.props;

    for (let i = 0; i < 12; i++) {
      listMonths.push(
        <Option key={getMonth} value={i}>
          {m.month(i).format("MMMM")}
        </Option>
      );
    }

    return listMonths;
  }

  getCurrentMonth() {
    const date = new Date();
    const { getMonth } = this.props;

    if(getMonth) {
      return Math.floor(getMonth)
    } else {
      return date.getMonth();
    }
  }

  render() {

    return (
      <div className="content-select option-left">
        <i className="label-distribuitors">Mês</i>
        <Select
          className="select-monthly"
          showSearch
          style={{ width: 200 }}
          optionFilterProp="children"
          defaultValue={this.getCurrentMonth()}
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          {this.getMonths()}
        </Select>
      </div>
    );
  }
}

export default ChooseMonthly;
