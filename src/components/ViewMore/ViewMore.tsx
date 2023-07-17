import React, { ReactElement } from 'react';
import Dropdown, { IOptionsType } from '../Dropdown';
import { DropdownDownIcon } from '../icons';
import { buttonStyle, buttonStyleWrap } from './ViewMore.style';

export interface IViewMoreProps {
  title?: string | ReactElement;
  options: IOptionsType[];
  onClickOption?: (k: string) => void;
}

function ViewMore({ title = 'View', options, onClickOption }: IViewMoreProps): ReactElement {
  return (
    <Dropdown
      title={title}
      options={options}
      buttonProps={{
        variant: 'outlined',
        color: 'primary',
        style: buttonStyle,
        endIcon: <DropdownDownIcon />,
        sx: buttonStyleWrap,
      }}
      onClickOption={onClickOption}
    />
  );
}

export default ViewMore;
