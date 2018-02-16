import moment from "moment";

const formatHours = "HH:mm";

export const validateHours = timeInit => {
  const hour = moment(timeInit, formatHours).hour();
  const hours = [];

  for (let i = 0; i < hour; i++) {
    hours.push(i);
  }
  return hours;
};

export const validateMinutes = (timeInit, timeFinish) => {
  const hourInit = moment(timeInit, formatHours).hour();
  const hourFinish = moment(timeFinish, formatHours).hours();
  const minute = moment(timeInit, formatHours).minute();
  const minutes = [];

  if (hourFinish === hourInit) {
    for (let i = 0; i <= minute; i++) {
      minutes.push(i);
    }
  }

  return minutes;
};

export const compareTime = (timeInit, timeFinish, type) => {

  let hourInit = moment(timeInit, formatHours).hour();
  let hourFinish = moment(timeFinish, formatHours).hour();

  let minuteInit = moment(timeInit, formatHours).minute();
  let minuteFinish = moment(timeFinish, formatHours).minute();

  console.log(hourInit, hourFinish, minuteInit, minuteFinish, type);

  if(type === 'hour') {
    return hourInit > hourFinish;
  } else if(type === 'minute') {
    return (hourInit === hourFinish && minuteInit >= minuteFinish) || (hourInit > hourFinish)
  }

  return false

};