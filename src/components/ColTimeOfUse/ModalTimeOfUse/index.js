import React, { Component } from "react";
import { Modal as BoxModal, DatePicker, TimePicker, Row, Col } from "antd";
import moment from "moment";
import "./ModalTimeOfUse.less";
import { notification } from "../../../modules/feedback";
import { validateHours, validateMinutes } from "../../../modules/validations";
import DateUse from "./DateUse";

const { RangePicker } = DatePicker;

const formatTime = "HH:mm";

class ModalTimeOfUse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRadio: "continuous",
      id: 0,
      dateInit: moment().month(this.newMonth()),
      dateFinish: moment().month(this.newMonth()),
      timeInit: null,
      timeFinish: null,
      endOpen: false
    };
  }

  convertDate = value => {
    if (typeof value === "string") {
      const year = value.substr(0, 4);
      const month = value.substr(5, 2);
      const day = value.substr(8, 2);

      return `${day}/${month}/${year}`;
    } else {
      return value;
    }
  };

  month = () => {
    return this.props.getMonth;
  };

  newMonth = () => {
    const month = Math.floor(this.month());
    const dateMonth = moment().month();
    return month !== null ? month : dateMonth;
  };

  async shouldComponentUpdate(nextProps) {
    if (nextProps.getMonth !== this.props.getMonth) {
      await this.setState(() => ({
        dateInit: moment().month(this.newMonth()),
        dateFinish: moment().month(this.newMonth())
      }));
      return true;
    }
  }

  componentDidUpdate() {
    const { id, dateInit, dateFinish, timeInit, timeFinish } = this.state;
    const { addUseOfMonth, index } = this.props;
    const newId = id + 1;

    if (dateInit && dateFinish && timeInit && timeFinish) {
      if (
        moment(timeInit).hour() === moment(timeFinish).hour() &&
        moment(timeInit).minute() >= moment(timeFinish).minute()
      ) {
        notification(
          "Minuto inválido",
          "O minuto da hora final deve ser maior que o minuto da hora inicial",
          "error"
        );
      } else if (moment(timeInit).hour() > moment(timeFinish).hour()) {
        notification(
          "Hora inválida",
          "A hora final deve ser maior ou igual à hora inicial",
          "error"
        );
      } else {
        const date = {
          id: newId,
          dateInit: dateInit,
          dateFinish: dateFinish,
          timeInit: timeInit,
          timeFinish: timeFinish
        };

        addUseOfMonth(date, index);

        this.setState({
          id: newId,
          dateInit: moment().month(this.newMonth()),
          dateFinish: moment().month(this.newMonth()),
          timeInit: null,
          timeFinish: null
        });
      }
    }
  }

  changeDatePicker = date => {
    this.setState({
      dateInit: date,
      dateFinish: date
    });
  };

  changeRangePicker = date => {
    this.setState({
      dateInit: date[0],
      dateFinish: date[1]
    });
  };

  changeTime = (currentTime, propType) => {
    this.setState({
      [propType]: currentTime
    });
  };

  dateRender = current => {
    if (current.month() === this.month()) {
      return <div className="ant-calendar-date">{current.date()}</div>;
    } else {
      return <div className="ant-calendar-date">{current.date()}</div>;
    }
  };

  disabledDate = current => {
    if (!current) return false;
    const cMonth = current.month();
    const mMonth = moment()
      .month(this.newMonth())
      .month();
    const cYear = current.year();
    const mYear = moment().year();

    return cMonth !== mMonth || cYear !== mYear;
  };

  convertMoment = (value, format) => {
    return value !== null ? moment(value, format) : null;
  };

  renderTime = (timeInit = null, timeFinish = null, indexDate) => {
    const { editUseOfMonth, index } = this.props;
    return (
      <div className="row">
        <TimePicker
          value={this.convertMoment(timeInit, formatTime)}
          format={formatTime}
          placeholder="Hora inicio"
          className="input-time _margin-right"
          allowEmpty={false}
          onChange={data => editUseOfMonth(data, indexDate, index, "timeInit")}
        />
        <TimePicker
          value={this.convertMoment(timeFinish, formatTime)}
          format={formatTime}
          allowEmpty={false}
          placeholder="Hora fim"
          className="imput-time"
          disabledHours={() => validateHours(timeInit)}
          disabledMinutes={hour => validateMinutes(timeInit, timeFinish)}
          onChange={data =>
            editUseOfMonth(data, indexDate, index, "timeFinish")}
        />
      </div>
    );
  };

  renderDatePicker = () => {
    const { useOfMonth } = this.props;

    return useOfMonth.map((item, indexDate) => {
      //FIXME: Resolver esta gambiarra
      return (
        <div key={Math.random()} className="_margin-bottom">
          <DateUse
            key={indexDate}
            {...this.props}
            convertMoment={this.convertMoment}
            item={item}
            indexDate={indexDate}
            convertDate={this.convertDate}
            dateRender={this.dateRender}
            disabledDate={this.disabledDate}
            renderTime={this.renderTime}
          />
        </div>
      );
    });
  };

  changeOnOk = () => {
    const { closeModal, useOfMonth } = this.props;

    if (useOfMonth.length > 0) {
      return closeModal(true);
    } else {
      notification(
        "Não há data e hora cadastrada",
        "Adicione uma data e uma hora para concluir",
        "error"
      );
    }
  };

  changeOnCancel = () => {
    const { closeModal } = this.props;
    const { timeInit, timeFinish } = this.state;

    if (timeInit && timeFinish) {
      this.setState({
        timeInit: null,
        timeFinish: null
      });
      closeModal();
    } else {
      closeModal();
    }
  };

  handleEndOpenChange = open => {
    if (!open) {
      this.setState({});
    }
  };

  render() {
    const { nameEquipment, visibleModal, useOfMonth } = this.props;
    const {
      valueRadio,
      dateInit,
      dateFinish,
      timeInit,
      timeFinish
    } = this.state;
    const marginTop = useOfMonth.length > 0 ? "_margin-bottom" : "";
    const labelInsert = useOfMonth.length ? <label>Inseridos:</label> : null;

    return (
      <div className="modal-time-of-use">
        <BoxModal
          title={`Tempo de Uso - ${nameEquipment}`}
          style={{ width: "600px" }}
          visible={visibleModal}
          onOk={() => this.changeOnOk()}
          onCancel={() => this.changeOnCancel()}
        >
          <div className={marginTop}>
            {labelInsert}
            {this.renderDatePicker()}
          </div>
          <div>
            <Row gutter={20}>
              <Col span={24} sm={10}>
                {valueRadio === "continuous" ? (
                  <div className="row -direction-column">
                    <label>Data inicial/final</label>
                    <RangePicker
                      onChange={this.changeRangePicker}
                      dateRender={this.dateRender}
                      disabledDate={this.disabledDate}
                      format={"DD/MM/YYYY"}
                      className="date-picker"
                      value={[dateInit, dateFinish]}
                    />
                  </div>
                ) : (
                  <div className="row -direction-column">
                    <label>Dia</label>
                    <DatePicker
                      onChange={this.changeDatePicker}
                      disabledDate={this.disabledDate}
                      format={"DD/MM/YYYY"}
                      className="date-picker"
                      value={dateInit}
                    />
                  </div>
                )}
              </Col>
              <Col span={24} sm={14}>
                <Row gutter={20}>
                  <Col span={12}>
                    <div className="row -direction-column">
                      <label>Hora inicial</label>
                      <TimePicker
                        className="time-picker"
                        value={this.convertMoment(timeInit)}
                        format={formatTime}
                        placeholder="Hora inicio"
                        onChange={data => this.changeTime(data, "timeInit")}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="row -direction-column">
                      <label>Hora final</label>
                      <TimePicker
                        className="time-picker"
                        value={this.convertMoment(timeFinish)}
                        format={formatTime}
                        placeholder="Hora fim"
                        disabledHours={() => validateHours(timeInit)}
                        disabledMinutes={hour =>
                          validateMinutes(timeInit, timeFinish)}
                        onChange={data => this.changeTime(data, "timeFinish")}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </BoxModal>
      </div>
    );
  }
}

export default ModalTimeOfUse;
