import React, { Component } from 'react';
import { Button, Icon, InputNumber, Table } from 'antd';
import AddEquipment from "../AddEquipment";
import './listEquipments.less';

class ListEquipments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      power: 0,
      list: [
        {
          id: '1',
          equipments: 'Computer de mesa',
          power: '200',
          quantity: 2,
          timeOfUse: "10:25:45",
          useOfMonth: [
            {
              dateInit: "2018-01-01",
              dateFinish: "2018-01-01",
              timeInit: "16:45:00",
              timeFinish: "17:15:00"
            },
            {
              dateInit: "2018-12-25",
              dateFinish: "2018-12-27",
              timeInit: "17:45:00",
              timeFinish: "18:45:00"
            }
          ],
          whiteTariff: 25.59,
          conventionalTariff: 28.76
        }
      ],
      columns: [
        {
          title: "Equipamentos",
          dataIndex: "equipments"
        },
        {
          title: "Potência",
          dataIndex: "power",
          key: "power",
          className: "column-right",
          render: value => this.inputNumber(value, 'power')
        },
        {
          title: "Quatidade",
          dataIndex: "quantity",
          key: "quantity",
          className: "column-right",
          render: value => this.inputNumber(value, 'quantity')
        },
        {
          title: "Tempo de Uso",
          dataIndex: "timeOfUse",
          key: "timeOfUse",
          className: "column-right",
          render: date => this.timeOfUse(date)
        },
        {
          title: "Tarifa Branca",
          dataIndex: "whiteTariff",
          key: "whiteTariff",
          className: "column-right",
          render: price => this.formattNumber(price)
        },
        {
          title: "Tarifa Convencional",
          dataIndex: "conventionalTariff",
          key: "conventionalTariff",
          className: "column-right",
          render: price => this.formattNumber(price)
        },
        {
          dataIndex: "id",
          key: "id",
          render: id => this.btnRemove(id)
        },
      ],
      formatter: {
        formatter: value => `${value}W`,
        parser: value => value.replace('W', '')
      }
    }
  }

  formattNumber = value => {
    const number = parseFloat(value).toFixed(2);
    return `R$ ${number}`
  };

  btnRemove = id => {
    return(
      <Button
        type="danger"
        size="small"
        onClick={() => this.removeItem(id)}
        ghost
      >
        <Icon type="close" />
      </Button>
    );
  };

  removeItem = id => {
    console.log(id)
  };

  inputNumber = (number, type) => {

    let { formatter} = this.state;
    formatter = (type === 'power') ? formatter : {};

    return(
      <InputNumber
        min={1}
        defaultValue={number}
        {...formatter}
        onChange={value => this.changeNumber(value, type)}
      />
    )
  };

  changeNumber = (value, type) => {
    if(type === 'quantity') {
      this.setState({ quantity: value })
    } else if(type === 'power') {
      this.setState({ power: value })
    }
  };

  timeOfUse = timeOfUse => {
    return(
      <div>
        <span>{`${timeOfUse}`}</span>
        <Button type="primary" size="small" className="_margin-small-left" ghost>
          <Icon type="edit"/>
        </Button>
      </div>
    );
  };

  render() {

    const { list, columns } = this.state;

    return (
      <div className="card">
        <Table
          dataSource={list}
          columns={columns}
          pagination={false}
          rowKey="id"
          footer={() =>
            <AddEquipment
              inputNumber={this.inputNumber.bind(this)}
              formattNumber={this.formattNumber.bind(this)}
            />
          }
        />
      </div>
    );
  }
}

export default ListEquipments;