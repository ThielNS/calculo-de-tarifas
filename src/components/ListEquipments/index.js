import React, { Component } from "react";
import { Button, Icon, InputNumber, Table, Input } from "antd";
import { formatNumber, notification } from "../../modules/feedback";
import { compareTime } from "../../modules/validations";
import ColTimeOfUseContainer from "../../containers/ColTimeOfUseContainer";
import ColTimeOfUse from "../ColTimeOfUse";
import SelectEquipments from "../SelectEquipments";
import "./listEquipments.less";

class ListEquipments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: 1,
      quantity: 1,
      useOfMonth: [],
      rowForm: {
        nameEquipment: "",
        power: 1,
        quantity: 1,
        date: {
          timeOfUse: "0h",
          useOfMonth: []
        },
        whiteTariff: 0.0,
        conventionalTariff: 0.0,
        form: true
      },
      columns: [
        {
          title: "Equipamentos",
          dataIndex: "nameEquipment",
          render: this.inputSearch
        },
        {
          title: "Potência (W)",
          dataIndex: "power",
          key: "power",
          render: (value, data, index) =>
            this.inputNumber(value, "power", data, index)
        },
        {
          title: "Quantidade",
          dataIndex: "quantity",
          key: "quantity",
          render: (value, data, index) =>
            this.inputNumber(value, "quantity", data, index)
        },
        {
          title: "Tempo de Uso",
          dataIndex: "date",
          key: "date",
          className: "column-right",
          render: this.timeOfUse
        },
        {
          title: "Tarifa Branca",
          dataIndex: "whiteTariff",
          key: "whiteTariff",
          className: "column-right",
          render: price => formatNumber(price)
        },
        {
          title: "Tarifa Convencional",
          dataIndex: "conventionalTariff",
          key: "conventionalTariff",
          className: "column-right",
          render: price => formatNumber(price)
        },
        {
          render: this.btnRemove
        }
      ],
      formatter: {
        formatter: value => `${value}`,
        parser: value => value.replace("W", "")
      },
      send: false
    };
  }

  componentDidUpdate() {
    const { rowForm, send } = this.state;
    const { nameEquipment, power, quantity, date } = rowForm;
    const { useOfMonth } = date;
    const { addEquipment } = this.props;

    // console.log(nameEquipment, "NAME EQUIPMENT");
    // console.log(power, "power");
    // console.log(quantity, "quantity");
    // console.log(useOfMonth, "useOfMonth");
    // console.log(send, "send");

    if (
      nameEquipment &&
      power > 0 &&
      quantity >= 1 &&
      useOfMonth.length > 0 &&
      send
    ) {
      const powerDistribuitorId = localStorage.getItem("powerDistribuitorId");

      if (powerDistribuitorId) {
        addEquipment(rowForm);

        this.setState({
          rowForm: {
            nameEquipment: "",
            power: 0,
            quantity: 1,
            date: {
              timeOfUse: "0h",
              useOfMonth: []
            },
            whiteTariff: 0.0,
            conventionalTariff: 0.0,
            form: true
          },
          send: !send
        });
      } else {
        notification(
          "Concessionária não encontrada",
          "Adicione uma Concessionária",
          "error"
        );
      }
    }
  }

  inputSearch = (value, data, index) => {
    const { editNameEquipment, searchEquipments } = this.props;

    if (data.form) {
      return (
        <SelectEquipments
          searchEquipments={searchEquipments}
          handleChangeEquipment={this.handleChangeEquipment}
          getPower={this.getPower}
        />
      );
    } else {
      return (
        <Input
          value={data.nameEquipment}
          onChange={name => editNameEquipment(name.target.value, index)}
        />
      );
    }
  };

  editEquipment = (value, type, data, index, event) => {
    if (!/^[0-9]*$/.test(value) && type === "quantity") {
      this.setState({ quantity: data.quantity });
      return;
    }

    if (!/^-?\d*\.?\d*$/.test(value) && type === "power") {
      this.setState({ power: data.power });
      return;
    }

    const { nameEquipment, power, quantity, date } = data;
    const { editEquipments } = this.props;

    let item;

    if (type === "power") {
      item = { power: value, quantity, date };
    } else if (type === "quantity") {
      item = { quantity: value, power, date };
    } else if (type === "date") {
      item = { date: value, power, quantity };
    }

    let newData = { nameEquipment, ...item };

    if (newData.power === 0 || newData.power === "") {
      newData.power = 1;
      this.setState({ power: 1 });
    }

    if (newData.quantity === 0 || newData.quantity === "") {
      newData.quantity = 1;
      this.setState({ quantity: 1 });
    }

    editEquipments(newData, index);
  };

  handleChangeEquipment = (name, powerEquipment) => {
    let { rowForm } = this.state;
    const { power, nameEquipment, ...restRowForm } = rowForm;

    if (powerEquipment) {
      this.setState({
        rowForm: {
          ...restRowForm,
          power: powerEquipment,
          nameEquipment: name
        }
      });
    } else {
      this.setState({
        rowForm: {
          ...restRowForm,
          nameEquipment: name
        }
      });
    }
  };

  getPower = () => {
    const { power } = this.state.rowForm;
    if (power === undefined) {
      this.setState({
        power: 1
      });
    }
    return power;
  };

  addUseOfMonth = (dates, index) => {
    const { listEquipments } = this.props;

    const data = { ...listEquipments[index], dates, index };

    this.props.addUseOfMonth(data, index);
  };

  editUseOfMonth = async (data, indexDate, indexEquipment, isTime = null) => {
    const { listEquipments, editUseOfMonth } = this.props;

    let dateTime = {};

    let { date } = listEquipments[indexEquipment];

    let { timeInit, timeFinish } = date.useOfMonth[indexDate];

    if (isTime === "timeInit" && compareTime(data, timeFinish, "hour")) {
      notification(
        "Hora inválida",
        "A hora final deve ser maior ou igual à hora inicial",
        "error"
      );
    } else if (isTime === "timeFinish" && compareTime(timeInit, data, "hour")) {
      notification(
        "Hora inválida",
        "A hora final deve ser maior ou igual à hora inicial",
        "error"
      );
    } else if (
      isTime === "timeInit" &&
      compareTime(data, timeFinish, "minute")
    ) {
      notification(
        "Minuto inválido",
        "O minuto inicial deve ser maior que o minuto final",
        "error"
      );
    } else if (
      isTime === "timeFinish" &&
      compareTime(timeInit, data, "minute")
    ) {
      notification(
        "Minuto inválido",
        "O minuto inicial deve ser maior que o minuto final",
        "error"
      );
    } else {
      if (isTime === "timeInit") {
        dateTime = {
          dateInit: date.useOfMonth[indexDate].dateInit,
          dateFinish: date.useOfMonth[indexDate].dateFinish,
          timeInit: data,
          timeFinish: date.useOfMonth[indexDate].timeFinish
        };
      } else if (isTime === "timeFinish") {
        dateTime = {
          dateInit: date.useOfMonth[indexDate].dateInit,
          dateFinish: date.useOfMonth[indexDate].dateFinish,
          timeInit: date.useOfMonth[indexDate].timeInit,
          timeFinish: data
        };
      } else {
        if (Array.isArray(data)) {
          dateTime = {
            dateInit: data[0],
            dateFinish: data[1],
            timeInit: date.useOfMonth[indexDate].timeInit,
            timeFinish: date.useOfMonth[indexDate].timeFinish
          };
        } else {
          dateTime = {
            dateInit: data,
            dateFinish: data,
            timeInit: date.useOfMonth[indexDate].timeInit,
            timeFinish: date.useOfMonth[indexDate].timeFinish
          };
        }
      }

      const newdata = { ...listEquipments[indexEquipment], dateTime };

      editUseOfMonth(newdata, indexEquipment, indexDate);
    }
  };

  btnRemove = (value, data, index) => {
    if (!data.form) {
      const { removeEquipments } = this.props;

      return (
        <Button
          type="danger"
          size="small"
          onClick={() => removeEquipments(index)}
          ghost
        >
          <Icon type="close" />
        </Button>
      );
    }
  };

  changeNumber = (value, type, ev) => {
    let { rowForm } = this.state;
    const { power, quantity, ...restRowForm } = rowForm;

    if (type === "quantity") {
      this.setState({
        rowForm: {
          quantity: value,
          power,
          ...restRowForm
        }
      });
    } else if (type === "power") {
      this.setState({
        rowForm: {
          power: value,
          quantity,
          ...restRowForm
        }
      });
    }
  };

  inputNumber = (number, type, data, index) => {
    let { formatter } = this.state;

    formatter =
      type === "power"
        ? formatter
        : {
            max: 255
          };
    if (data.form) {
      return (
        <InputNumber
          value={number}
          min={1}
          type="number"
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          {...formatter}
          onChange={value => this.changeNumber(value, type)}
        />
      );
    }
    return (
      <InputNumber
        value={number}
        min={1}
        parser={value => value.replace(/\$\s?|(,*)/g, "")}
        {...formatter}
        onChange={value => this.editEquipment(value, type, data, index)}
      />
    );
  };

  timeOfUse = (value, data, index) => {
    const { modal, toggleModal, listEquipments, getMonth } = this.props;

    if (data.form) {
      return (
        <ColTimeOfUse
          listEquipments={listEquipments}
          timeOfUse={value.timeOfUse}
          nameEquipment={data.nameEquipment}
          modal={modal}
          toggleModal={toggleModal}
          useOfMonth={value.useOfMonth}
          editUseOfMonth={this.editUseOfMonthInsert}
          addUseOfMonth={this.addUseOfMonthInsert}
          deleteDates={this.deleteDates}
          index={index}
          submitData={this.submitData}
          getMonth={getMonth}
        />
      );
    } else {
      return (
        <ColTimeOfUseContainer
          listEquipments={listEquipments}
          timeOfUse={value.timeOfUse}
          nameEquipment={data.nameEquipment}
          modal={modal}
          toggleModal={toggleModal}
          useOfMonth={value.useOfMonth}
          editUseOfMonth={this.editUseOfMonth}
          addUseOfMonth={this.addUseOfMonth}
          index={index}
          submitData={() => {}}
        />
      );
    }
  };

  addUseOfMonthInsert = dateTime => {
    const { rowForm } = this.state;
    let { date, ...restDate } = rowForm;

    date.useOfMonth.push(dateTime);

    this.setState({
      rowForm: {
        date,
        ...restDate
      }
    });
  };

  editUseOfMonthInsert = (data, indexDate, indexEquipment, isTime = null) => {
    const { rowForm } = this.state;
    const { useOfMonth, timeOfUse } = rowForm.date;
    let { ...restRowForm } = rowForm;

    let dateTime = {};

    if (isTime === "timeInit") {
      dateTime = {
        dateInit: useOfMonth[indexDate].dateInit,
        dateFinish: useOfMonth[indexDate].dateFinish,
        timeInit: { ...data },
        timeFinish: useOfMonth[indexDate].timeFinish
      };
    } else if (isTime === "timeFinish") {
      dateTime = {
        dateInit: useOfMonth[indexDate].dateInit,
        dateFinish: useOfMonth[indexDate].dateFinish,
        timeInit: useOfMonth[indexDate].timeInit,
        timeFinish: data
      };
    } else {
      if (Array.isArray(data)) {
        dateTime = {
          dateInit: data[0],
          dateFinish: data[1],
          timeInit: useOfMonth[indexDate].timeInit,
          timeFinish: useOfMonth[indexDate].timeFinish
        };
      } else {
        dateTime = {
          dateInit: data,
          dateFinish: data,
          timeInit: useOfMonth[indexDate].timeInit,
          timeFinish: useOfMonth[indexDate].timeFinish
        };
      }
    }

    const newUseOfMonth = useOfMonth.map((item, index) => {
      if (index === indexDate) {
        item = dateTime;
      }
      return item;
    });

    this.setState({
      rowForm: {
        ...restRowForm,
        date: {
          useOfMonth: newUseOfMonth,
          timeOfUse
        }
      }
    });
  };

  submitData = () => {
    this.setState(state => ({
      send: !state.send
    }));
  };

  deleteDates = (data, indexEquipment, indexDate) => {
    const { date, ...restRowForm } = this.state.rowForm;
    const { useOfMonth, timeOfUse } = date;

    const newUseOfMonth = [
      ...useOfMonth.slice(0, indexDate),
      ...useOfMonth.slice(indexDate + 1)
    ];

    this.setState({
      rowForm: {
        date: {
          useOfMonth: newUseOfMonth,
          timeOfUse
        },
        ...restRowForm
      }
    });
  };

  render() {
    const { columns, rowForm } = this.state;
    const { listEquipments } = this.props;

    return (
      <div className="card _margin-bottom-space">
        <Table
          dataSource={[...listEquipments, rowForm]}
          columns={columns}
          pagination={false}
          className="list-equipmets"
          rowKey={(data, index) => index}
          scroll={{ x: 900 }}
        />
      </div>
    );
  }
}

export default ListEquipments;
