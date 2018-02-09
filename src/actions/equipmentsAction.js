import { notification } from "antd";

import {
  ADD_EQUIPMENT,
  DELETE_DATES,
  EDIT_EQUIPMENTS,
  EDIT_NAME_EQUIPMENT,
  EDIT_USE_OF_MONTH,
  LIST_EQUIPMENTS,
  REMOVE_EQUIPMENTS,
  RESET_LIST_EQUIPMENTS,
  UPDATE_MONTH_EQUIPMENTS
} from "../reducers/equipmentsReducer/constants";
import { get, post } from "../modules/request";
import { createObject, updateEquipments } from "./powerDistribuitorAction";

const notificationError = (title, content) => {
  notification["error"]({
    message: title,
    description: content
  });
};

export const listEquipments = () => dispatch => {
  return dispatch({ type: LIST_EQUIPMENTS });
};

export const searchEquipments = name => dispatch => {
  //const limit = 5;

  const limit = 5;

  return get(`equipments?name=${name}&limit=${limit}`)
    .then(data => data)
    .catch(error => {
      console.error(error);
    });
};

export const convertUseOfMonth = useOfMonth => {
  let newUseOfMonth = [];

  useOfMonth.map(item => {
    let dates = { id: item.id };

    if (
      typeof item.dateInit !== "string" ||
      typeof item.dateFinish !== "string"
    ) {
      if (!item.dateInit || !item.dateFinish) {
        notificationError("Data invalida", "A data não pode ser nula");
      } else {
        dates = {
          ...dates,
          dateInit: item.dateInit.format("YYYY-MM-DD"),
          dateFinish: item.dateFinish.format("YYYY-MM-DD")
        };
      }
    } else {
      dates = {
        ...dates,
        dateInit: item.dateInit,
        dateFinish: item.dateFinish
      };
    }

    if (typeof item.timeInit !== "string") {
      if (!item.timeInit) {
        notificationError("Hora invalida", "A Hora não pode ser nula");
      } else {
        dates = {
          ...dates,
          timeInit: item.timeInit.format("HH:mm")
        };
      }
    } else {
      dates = {
        ...dates,
        timeInit: item.timeInit
      };
    }

    if (typeof item.timeFinish !== "string") {
      if (!item.timeFinish) {
        notificationError("Hora invalida, A Hora não pode ser nula");
      } else {
        dates = {
          ...dates,
          timeFinish: item.timeFinish.format("HH:mm")
        };
      }
    } else {
      dates = {
        ...dates,
        timeFinish: item.timeFinish
      };
    }

    newUseOfMonth.push(dates);

    return item;
  });

  return newUseOfMonth;
};

export const convertEquipment = (data, useOfMonth, isRequest = false) => {
  if (isRequest) {
    return {
      power: data.power,
      quantity: data.quantity,
      useOfMonth
    };
  } else {
    return {
      nameEquipment: data.nameEquipment,
      power: data.power,
      quantity: data.quantity,
      date: {
        useOfMonth
      }
    };
  }
};

const createObj = data => {
  const useOfMonth = convertUseOfMonth(data.date.useOfMonth);
  const equipment = convertEquipment(data, useOfMonth, true);
  const newMonth = Math.floor(localStorage.getItem("monthIndex"));

  const dateMonth = new Date().getMonth();
  const monthIndex = newMonth !== null ? newMonth : dateMonth;

  const powerDistribuitorId = localStorage.getItem("powerDistribuitorId");
  const month = Math.floor(monthIndex) + 1;

  return {
    powerDistribuitorId: powerDistribuitorId,
    month: month,
    equipments: [equipment]
  };
};

export const addEquipment = data => dispatch => {
  let newObj = createObj(data);
  const newData = convertEquipment(
    data,
    convertUseOfMonth(data.date.useOfMonth)
  );

  post("calculate", newObj).then(response => {
    newData.date.timeOfUse = response[0].timeOfUse;
    newData.whiteTariff = response[0].whiteTariffEnergySpending;
    newData.conventionalTariff = response[0].conventionalTariffEnergySpending;
    return dispatch({
      type: ADD_EQUIPMENT,
      data: newData
    });
  });
};

export const removeEquipments = index => dispatch => {
  return dispatch({
    type: REMOVE_EQUIPMENTS,
    index: index
  });
};

export const editEquipments = (data, index) => dispatch => {
  let newObj = createObj(data);
  const newData = convertEquipment(
    data,
    convertUseOfMonth(data.date.useOfMonth)
  );

  post("calculate", newObj)
    .then(response => {
      newData.date.timeOfUse = response[0].timeOfUse;
      newData.whiteTariff = response[0].whiteTariffEnergySpending;
      newData.conventionalTariff = response[0].conventionalTariffEnergySpending;
      dispatch({
        type: EDIT_EQUIPMENTS,
        dataItem: newData,
        index
      });
    })
    .catch(data => {
      if (data.power < 0.01) {
        notificationError(
          "Erro ao Editar",
          "Potencia tem que ser maior que 0.01"
        );
      } else if (data.quantity % 1 !== 0) {
        notificationError(
          "Erro ao Editar",
          "Quantidade deve ser um número inteiro"
        );
      }
    });
};

export const addUseOfMonth = (data, index) => dispatch => {
  const { dates, ...restData } = data;

  restData.date.useOfMonth.push(dates);

  let newObj = createObj(restData);
  const newData = convertEquipment(
    restData,
    convertUseOfMonth(restData.date.useOfMonth)
  );

  post("calculate", newObj).then(response => {
    newData.date.timeOfUse = response[0].timeOfUse;
    newData.whiteTariff = response[0].whiteTariffEnergySpending;
    newData.conventionalTariff = response[0].conventionalTariffEnergySpending;
    return dispatch({
      type: EDIT_EQUIPMENTS,
      dataItem: newData,
      index
    });
  });
};

export const editUseOfMonth = (data, indexEquipment, indexDate) => dispatch => {
  const { dateTime, ...restData } = data;

  restData.date.useOfMonth[indexDate] = dateTime;

  let newObj = createObj(restData);
  const newData = convertEquipment(
    restData,
    convertUseOfMonth(restData.date.useOfMonth)
  );

  post("calculate", newObj).then(response => {
    newData.date.timeOfUse = response[0].timeOfUse;
    newData.whiteTariff = response[0].whiteTariffEnergySpending;
    newData.conventionalTariff = response[0].conventionalTariffEnergySpending;
    return dispatch({
      type: EDIT_USE_OF_MONTH,
      data: newData,
      indexEquipment,
      indexDate
    });
  });
};

const convertDate = (date, month) => {
  let year = date.substr(0, 4);
  let day = date.substr(8, 2);
  let newMonth;

  if (month <= 9) {
    newMonth = `0${month + 1}`;
  } else {
    newMonth = month + 1;
  }

  return `${year}-${newMonth}-${day}`;
};

export const changeListEquipments = (dataList, changeValue, method = null) => {
  return dataList.map(item => {
    item.date.useOfMonth.map(dateTime => {
      dateTime.dateInit = convertDate(dateTime.dateInit, changeValue);
      dateTime.dateFinish = convertDate(dateTime.dateFinish, changeValue);

      return dateTime;
    });

    return item;
  });
};

export const updateMonthEquipments = (dataList, month) => dispatch => {
  const newDataList = changeListEquipments(dataList, month);

  const newData = newDataList.map(item => {
    const newUseOfMonth = convertUseOfMonth(item.date.useOfMonth);
    item = convertEquipment(item, newUseOfMonth, true);
    return item;
  });

  const newObj = createObject(
    newData,
    localStorage.getItem("powerDistribuitorId")
  );

  post("calculate", newObj).then(response => {
    return dispatch({
      type: UPDATE_MONTH_EQUIPMENTS,
      updateData: updateEquipments(response, newDataList)
    });
  });
};

export const resetListEquipments = dispatch => {
  return {
    type: RESET_LIST_EQUIPMENTS
  };
};

export const deleteDates = (data, indexEquipment, indexDate) => dispatch => {
  let useOfMonth = data[indexEquipment].date.useOfMonth;

  const newUseOfMonth = [
    ...useOfMonth.slice(0, indexDate),
    ...useOfMonth.slice(indexDate + 1)
  ];

  const resultState = data.map((equipment, indexE) => {
    if (indexE === indexEquipment) {
      equipment.date.useOfMonth = newUseOfMonth;
    }
    return equipment;
  });

  const newData = resultState.map(item => {
    const newUseOfMonth = convertUseOfMonth(item.date.useOfMonth);
    item = convertEquipment(item, newUseOfMonth, true);
    return item;
  });
  
  let newObject = createObject(
    newData,
    localStorage.getItem("powerDistribuitorId"),
    localStorage.getItem("monthIndex")
  );

  post("calculate", newObject).then(response => {
    return dispatch({
      type: DELETE_DATES,
      listEquipment: updateEquipments(response, resultState)
    });
  });
};

export const editNameEquipment = (
  nameEquipment,
  indexEquipment
) => dispatch => {
  return dispatch({
    type: EDIT_NAME_EQUIPMENT,
    indexState: indexEquipment,
    nameEquipment
  });
};
