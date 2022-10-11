import React, { useCallback, useMemo, useState } from 'react';
import Button from './Button';
import { ComponentMeta, Story } from '@storybook/react';
import { ButtonProps as IButtonProps, Input } from '@mui/material';
import { isEmpty } from 'lodash';

export default {
  title: 'Component/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const FirstTemplete: Story<IButtonProps> = (args) => {
  return <Button {...args} />;
};

const SecondTemplete: Story<IButtonProps> = (args) => {
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
      <Button {...args} disabled={validation} color="primary" variant="contained" onClick={() => alert('띠용')}>
        {'Template'}
      </Button>
    </div>
  );
};

export const First = FirstTemplete.bind({});
export const DisableButton = SecondTemplete.bind({});
