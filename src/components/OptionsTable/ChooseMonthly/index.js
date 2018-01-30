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

  handleChange = key => {
    localStorage.setItem("monthIndex", key);
    console.log(key);
  };

  getMonths() {
    const m = new Moment();
    let listMonths = [];
    for (let i = 0; i < 12; i++) {
      listMonths.push(
        <Option key={localStorage.getItem("monthIndex")} value={i}>
          {m.month(i).format("MMMM")}
        </Option>
      );
    }

    return listMonths;
  }

  getCurrentMonth() {
    const date = new Date();
    const currentMonth = date.getMonth();
    /* console.log(currentMonth)
 */ return currentMonth;
  }

  render() {
    const { listMonths } = this.props;
    console.log(listMonths);

    return (
      <div className="content-select option-left">
        <i className="label-distribuitors">Mês</i>
        <Select
          className="select-monthly"
          showSearch
          style={{ width: 200 }}
          placeholder="Janeiro"
          optionFilterProp="children"
          firstActiveValue={this.getCurrentMonth()}
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
