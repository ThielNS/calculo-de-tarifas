import moment from "moment";

const formatHours = 'HH:mm';

export const validateHours = (timeInit) => {
  const hour = moment(timeInit, formatHours).hour();
  const hours = [];

  for(let i = 0; i < hour; i++) {
    hours.push(i);
  }

  return hours;
};

export const validateMinutes = (timeInit, timeFinish) => {
  const hourInit = moment(timeInit, formatHours).hour();
  const hourFinish = moment(timeFinish, formatHours).hours();
  const minute = moment(timeInit, formatHours).minute();
  const minutes = [];

  if(hourFinish === hourInit) {
    for(let i =0; i <= minute; i++) {
      minutes.push (i);
    }
  }

  return minutes;
};

export  const compareHours = (timeInit, timeFinish) => {
  const hourInit = moment(timeInit, formatHours).hour();
  const hourFinish = moment(timeFinish, formatHours).hours();
  const minuteInit = moment(timeInit, formatHours).minute();
  const minuteFinish = moment(timeFinish, formatHours).minute();

  if(hourInit === hourFinish) {
    return minuteFinish <= minuteInit;
  } else {
    return false;
  }

};
