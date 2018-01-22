import React, { Component } from 'react';
import { Select } from 'antd';
const { Option, OptGroup } = Select;

class ChooseMonthly extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monthlys: [
                {
                    number: 1,
                    name: 'Janeiro'
                },
                {
                    number: 2,
                    name: 'Fevereiro'
                },
                {
                    number: 3,
                    name: 'Maio'
                },
                {
                    number: 4,
                    name: 'Março'
                },
                {
                    number: 5,
                    name: 'Abril'
                },
                {
                    number: 6,
                    name: 'Junho'
                },
                {
                    number: 7,
                    name: 'Julho'
                },
                {
                    number: 8,
                    name: 'Agosto'
                },
                {
                    number: 9,
                    name: 'Setembro'
                },
                {
                    number: 10,
                    name: 'Outubro'
                },
                {
                    number: 11,
                    name: 'Novembro'
                },
                {
                    number: 12,
                    name: 'Dezembro'
                }
            ]
        }
    }
    handleChange(value) {
        /* console.log(`Selected ${value}`) */
    }
    renderOptions() {
        const { monthlys } = this.state;
        return monthlys.map((item, index) => (
            <Option value={item.name} key={index}>{item.name}</Option>
        ))
    }
    render() {
        const { monthlys } = this.state;
        console.log(monthlys);
        return (
            <div className="content-select" >
                <i className="label-distribuitors">Escolha um mês</i>
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

export default ChooseMonthly;