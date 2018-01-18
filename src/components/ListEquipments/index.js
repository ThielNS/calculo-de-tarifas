import React, { Component } from 'react';
import { Button, Icon, Table } from 'antd';
import AddEquipment from "../AddEquipment";
import './listEquipments.less';

class ListEquipments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: '1',
          equipments: 'Computer',
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
          render: power => `${power}W`
        },
        {
          title: "Quatidade",
          dataIndex: "quantity",
          key: "quantity"
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
          render: price => `R$ ${price}`
        },
        {
          title: "Tarifa Convencional",
          dataIndex: "conventionalTariff",
          key: "conventionalTariff",
          className: "column-right",
          render: price => `R$ ${price}`
        },
        {
          dataIndex: "id",
          key: "id",
          render: id => this.btnRemove(id)
        },
      ]
    }
  }

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

  timeOfUse = timeOfUse => {
    return(
      <div>
        <span>{`${timeOfUse}`}</span>
        <Button type="primary" size="small" className="_margin-left" ghost>
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
          footer={() => <AddEquipment/>}
        />
      </div>
    );
  }
}

export default ListEquipments;