import React, { Component } from 'react';
import { Table } from 'antd';

class ListEquipments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          equipments: 'Computer',
          power: '200W',
          quantity: 1,
          timeOfUse: "10:25:45",
          whiteTariff: 25.59,
          conventionalTariff: 28.76
        },
        {
          equipments: 'Computer',
          power: '200W',
          quantity: 1,
          timeOfUse: "10:25:45",
          whiteTariff: 25.59,
          conventionalTariff: 28.76
        },
        {
          equipments: 'Computer',
          power: '200W',
          quantity: 1,
          timeOfUse: "10:25:45",
          whiteTariff: 25.59,
          conventionalTariff: 28.76
        },
        {
          equipments: 'Computer',
          power: '200W',
          quantity: 1,
          timeOfUse: "10:25:45",
          whiteTariff: 25.59,
          conventionalTariff: 28.76
        },
      ]
    }
  }

  render() {

    const { Column } = Table;
    const { list } = this.state;

    return (
      <Table dataSource={list} pagination={false}>
        <Column
          title="Equipamentos"
          dataIndex="equipments"
          key="equipments"
        />
        <Column
          title="Potência"
          dataIndex="power"
          key="power"
        />
        <Column
          title="Quantidade"
          dataIndex="quantity"
          key="quantity"
        />
        <Column
          title="Tempo de Uso"
          dataIndex="timeOfUse"
          key="timeOfUse"
        />
        <Column
          title="Tarifa Branca"
          dataIndex="whiteTariff"
          key="whiteTariff"
        />
        <Column
          title="Tarifa Convencional"
          dataIndex="conventionalTariff"
          key="conventionalTariff"
        />
      </Table>
    );
  }
}

export default ListEquipments;