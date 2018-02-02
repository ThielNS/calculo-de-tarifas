import React from 'react'
import { Icon, notification as notificationAntd } from 'antd'

const styleTypeIcon = (type) => {
  if(type === 'error') {
    return { color: 'red'}
  }
};

export const notification = (title, description, type) => {
  notificationAntd[type]({
    message: title,
    description: description,
    icon: <Icon type="frown-o" style={styleTypeIcon(type)}/>,
  });
};