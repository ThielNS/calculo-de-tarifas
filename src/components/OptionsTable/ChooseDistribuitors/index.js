import React, { Component } from "react";
import { Select } from 'antd';
import "./chooseDistribuitors.less";

class chooseDistribuitors extends Component {

    componentDidMount() {
        this.props.listDistribuitors();
    }

    renderOptions() {
        const { Option } = Select;
        const { itemsDistribuitors } = this.props;
        return itemsDistribuitors.map((item, index) => (
            <Option key={index} value={item.name} >{item.name}</Option>
        ));
    }
    handleChange(value) {
/*         console.log(`selected ${value}`);
 */ }
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
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.renderOptions()}

                </Select>
            </div>
        )
    }
}

export default chooseDistribuitors;