import React, { ReactElement } from 'react';
import Dropdown, { IOptionsType } from '../Dropdown';
import { DropdownDownIcon } from '../icons';
import { buttonStyle, buttonStyleWrap } from './ViewMore.style';
// import { useTranslation } from 'react-i18next';

export interface IViewMoreProps {
  //Todo: define props
  title?: string | ReactElement;
  options: IOptionsType[];
  onClickOption?: (k: string) => void;
}

function ViewMore({ title = 'View', options, onClickOption }: IViewMoreProps): ReactElement {
  // const { t } = useTranslation();

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
