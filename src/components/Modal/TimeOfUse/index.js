import React  from 'react';
import { Radio } from 'antd';

const TimeOfUse = () => {
  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;

  return (
    <div>
      <RadioGroup defaultValue="1" size="small">
        <RadioButton value="1">Uso contínuo</RadioButton>
        <RadioButton value="2">Uso diário</RadioButton>
      </RadioGroup>
    </div>
  );
};

export default TimeOfUse;