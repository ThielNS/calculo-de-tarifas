import React, { Component } from "react";
import { Select } from 'antd';
import "./chooseDistribuitors.less";

class chooseDistribuitors extends Component {

    constructor(props) {
        super(props);

        this.state = {
            powerDistribuitorId: '',
        }
    }

    componentDidMount() {
        this.props.listDistribuitors();
        this.props.listEquipments();
        this.props.listCalculateEquipments();
    }

    renderOptions() {
        const { Option } = Select;
        const { itemsDistribuitors } = this.props;
        return itemsDistribuitors.map((item, index) => (
            <Option key={index} value={item.id}>{item.name}</Option>
        ));
    }

    handleChange = (value) => {
        const { itemsEquipments } = this.props;
        console.log(itemsEquipments);
        this.props.listCalculateEquipments();
        
        this.setState({ powerDistribuitorId: value });
        console.log(`Selected ${value}`);

    };

    render() {

        console.log(this.state.powerDistribuitorId)
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