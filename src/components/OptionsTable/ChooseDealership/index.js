import React, { Component } from "react";
import { Select } from 'antd';


class ChooseDealership extends Component {

    render() {
        const Option = Select.Option;
        function handleChange(value) {
            //console.log(`selected ${value}`);
        }


        return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="AES Eletropaulo"
                    optionFilterProp="children"
                    onChange={handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
        )
    }
}

export default ChooseDealership;