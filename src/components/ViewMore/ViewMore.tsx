import React, { ReactElement, useContext } from 'react';
import Dropdown, { IOptionsType } from '../Dropdown';
import { DropdownDownIcon } from '../icons';
import { buttonStyle, buttonStyleWrap } from './ViewMore.style';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

export interface IViewMoreProps {
  title?: string | ReactElement;
  options: IOptionsType[];
  onClickOption?: (k: string) => void;
}

function ViewMore({ title = 'View', options, onClickOption }: IViewMoreProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default ViewMore;
