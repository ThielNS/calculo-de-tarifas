import { notification } from 'antd';

import {
  ADD_EQUIPMENT,
  EDIT_EQUIPMENTS,
  EDIT_USE_OF_MONTH,
  LIST_EQUIPMENTS,
  REMOVE_EQUIPMENTS,
  RESET_LIST_EQUIPMENTS
} from "../reducers/equipmentsReducer/constants";
import { get, post } from "../modules/request";

const notificationError = (title, content) => {
  notification['error']({
    message: title,
    description: content
  })
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

export const convertUseOfMonth = (useOfMonth) => {

  let newUseOfMonth = [];


  useOfMonth.map((item) => {

    let dates = {};

    if(typeof(item.dateInit) !== 'string' || typeof(item.dateFinish) !== 'string') {
      if(!item.dateInit || !item.dateFinish) {
        notificationError('Data invalida', 'A data não pode ser nula')
      } else {
        dates = {
          ...dates,
          dateInit: item.dateInit.format ('YYYY-MM-DD'),
          dateFinish: item.dateFinish.format ('YYYY-MM-DD'),
        };
      }
    } else {
      dates = { ...dates,
        dateInit: item.dateInit,
        dateFinish: item.dateFinish
      };
    }

    if(typeof(item.timeInit) !== 'string') {
      if(!item.timeInit) {
        notificationError('Hora invalida', 'A Hora não pode ser nula')
      } else {
        dates = { ...dates,
          timeInit: item.timeInit.format('HH:mm')
        };
      }
    } else {
      dates = { ...dates,
        timeInit: item.timeInit
      };
    }

    if(typeof(item.timeFinish) !== 'string') {
      if(!item.timeFinish) {
        notificationError('Hora invalida, A Hora não pode ser nula')
      } else {
        dates = { ...dates,
          timeFinish: item.timeFinish.format('HH:mm')
        };
      }
    } else {
      dates = { ...dates,
        timeFinish: item.timeFinish
      };
    }

    newUseOfMonth.push(dates);

    return item
  });

  return newUseOfMonth;

};

export const convertEquipment = (data, useOfMonth, isRequest = false) => {
  if(isRequest) {
    return {
      power: data.power,
      quantity: data.quantity,
      useOfMonth
    }
  } else {
    return {
      nameEquipment: data.nameEquipment,
      power: data.power,
      quantity: data.quantity,
      date: {
        useOfMonth
      }
    }
  }
};

const createObj = data => {

  const useOfMonth = convertUseOfMonth(data.date.useOfMonth);
  const equipment = convertEquipment(data, useOfMonth, true);

  return {
    powerDistribuitorId: '019EA005-6182-4F8D-95A4-DE3D86CBA51B',
    month : 1,
    equipments : [
      equipment
    ]
  }
};

export const addEquipment = data => dispatch => {

  let newObj = createObj(data);
  const newData = convertEquipment(data, convertUseOfMonth(data.date.useOfMonth));

  post('calculate', newObj)
    .then(response => {
      newData.date.timeOfUse = response[0].timeOfUse;
      newData.whiteTariff = response[0].whiteTariffEnergySpending;
      newData.conventionalTariff = response[0].conventionalTariffEnergySpending;
      return dispatch({
        type: ADD_EQUIPMENT,
        data: newData
      })
    });
  }

export const removeEquipments = index => dispatch => {
  return dispatch({
    type: REMOVE_EQUIPMENTS,
    index: index
  });
};

export const editEquipments = (data, index) => dispatch => {

  let newObj = createObj(data);
  const newData = convertEquipment(data, convertUseOfMonth(data.date.useOfMonth));

  post('calculate', newObj)
    .then(response => {
      newData.date.timeOfUse = response[0].timeOfUse;
      newData.whiteTariff = response[0].whiteTariffEnergySpending;
      newData.conventionalTariff = response[0].conventionalTariffEnergySpending;
      dispatch({
        type: EDIT_EQUIPMENTS,
        dataItem: newData,
        index,
      })
    })
    .catch(data => {
      if(data.power < 0.01) {
        notificationError('Erro ao Editar', 'Potencia tem que ser maior que 0.01');
      } else if(data.quantity % 1 !== 0) {
        notificationError('Erro ao Editar', 'Quantidade deve ser um número inteiro');
      }
    });
  };


export const addUseOfMonth = (data, index) => dispatch => {

  const { dates, ...restData } = data;

  restData.date.useOfMonth.push(dates);

  let newObj = createObj(restData);
  const newData = convertEquipment(restData, convertUseOfMonth(restData.date.useOfMonth));

  post('calculate', newObj)
    .then(response => {
      newData.date.timeOfUse = response[0].timeOfUse;
      newData.whiteTariff = response[0].whiteTariffEnergySpending;
      newData.conventionalTariff = response[0].conventionalTariffEnergySpending;
      return dispatch({
        type: EDIT_EQUIPMENTS,
        dataItem: newData,
        index,
      })
    });
  };


export const editUseOfMonth = (data, indexEquipment, indexDate) => dispatch => {

  const { dateTime, ...restData } = data;

  restData.date.useOfMonth[indexDate] = dateTime;

  let newObj = createObj(restData);
  const newData = convertEquipment(restData, convertUseOfMonth(restData.date.useOfMonth));

  post('calculate', newObj)
    .then(response => {
      newData.date.timeOfUse = response[0].timeOfUse;
      newData.whiteTariff = response[0].whiteTariffEnergySpending;
      newData.conventionalTariff = response[0].conventionalTariffEnergySpending;
      return dispatch({
        type: EDIT_USE_OF_MONTH,
        data: newData,
        indexEquipment,
        indexDate
      })
    });
};

export const resetListEquipments = dispatch => {
  return {
    type: RESET_LIST_EQUIPMENTS
  };
};
