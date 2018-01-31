import React, { Component } from "react";
import { Select } from "antd";
import "./chooseDistribuitors.less";

class chooseDistribuitors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      powerDistribuitorId: ""
    };
  }

  componentDidMount() {
    this.props.listDistribuitors();
  }

  handleChange = value => {
    /*  const { itemsEquipments } = this.props;
    */
    this.props.listCalculateEquipments();
    this.setState({ powerDistribuitorId: value });
    console.log(`Selected ${value}`);
    localStorage.setItem("powerDistribuitorId", value);
    console.log(localStorage.getItem("powerDistribuitorId"))
  };

  renderOptions() {
    const { Option } = Select;
    const { itemsDistribuitors } = this.props;
    return itemsDistribuitors.map((item, index) => (
      <Option key={localStorage.getItem("powerDistribuitorId")} value={item.id}>
        {item.name}
      </Option>
    ));
  }

  render() {
    return (
      <div className="content-select">
        <i className="label-distribuitors">Concessionárias</i>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="AES Eletropaulo"
          optionFilterProp="children"
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          {this.renderOptions()}
        </Select>
      </div>
    );
  }
}

export default chooseDistribuitors;
