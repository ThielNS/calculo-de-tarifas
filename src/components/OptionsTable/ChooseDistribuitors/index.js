import React, { Component } from "react";
import { Select } from 'antd';
import "./chooseDistribuitors.less";

class chooseDistribuitors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    id: "fsdfsd",
                    name: "Distribuidora X"
                },
                {
                    id: "fsdfids",
                    name: "Distribuidora Y"
                }
            ]
        }
    }

    renderOptions = () => {
        const Option = Select.Option;
        const { distribuitors } = this.state;



        return distribuitors.map((name, index) => (
            <Option value={distribuitors.name}>{distribuitors.name}</Option>
        ))
    }


    render() {
        const Option = Select.Option;
        const { ...distribuitors } = this.state.list;

        console.log(distribuitors.name);
        console.log(distribuitors);

        function handleChange(value) {
            //console.log(`selected ${value}`);
        }
        //const { distribuitor } = this.props;

        return (
            <div className="content-select">
                <i className="label-distribuitors">Distribuidoras</i>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="AES Eletropaulo"
                    optionFilterProp="children"
                    onChange={handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value={distribuitors.name}></Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </div>
        )
    }
}

export default chooseDistribuitors;