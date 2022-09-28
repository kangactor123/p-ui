import React, { useCallback, useMemo, useState } from 'react';
import Button, { ButtonProps } from './Button';
import { ComponentMeta, Story } from '@storybook/react';
import { Input } from '@mui/material';
import { isEmpty } from 'lodash';

export default {
  title: 'Component/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const FirstTemplete: Story<ButtonProps> = (args) => {
  const { text = 'first' } = args;
  return <Button {...args} text={text} />;
};

const SecondTemplete: Story<ButtonProps> = (args) => {
  const { text = 'second' } = args;
  const [value, setValue] = useState('');
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  }, []);

  const validation = useMemo(() => {
    return isEmpty(value) && true;
  }, [value]);

  return (
    <div>
      <div>
        <Input type="text" value={value} onChange={handleChange} />
      </div>
      <br />
      <Button
        {...args}
        text={text}
        disabled={validation}
        color="primary"
        variant="contained"
        onClick={() => alert('띠용')}
      />
    </div>
  );
};

export const First = FirstTemplete.bind({});
export const DisableButton = SecondTemplete.bind({});
