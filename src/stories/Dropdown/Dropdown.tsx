import React, { MouseEvent, ReactElement, useCallback, useContext, useState } from 'react';
import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import Tooltip from '../Tooltip';
import { PlayceThemeContext } from '../../providers';
import styled from '@emotion/styled';

export interface IOptionsType {
  key: string;
  label: ReactElement | string;
  disabled?: boolean;
  split?: boolean;
}

export interface IDropdownProps {
  options: IOptionsType[];
  title?: string | ReactElement;
  tooltip?: string;
  isIconButton?: boolean;
  iconButtonProps?: IconButtonProps;
  buttonProps?: ButtonProps;
  onClickOption?: (key: string, id?: number) => void;
}

const MenuList = styled.li<{ split: boolean }>`
  padding: 3px 0;
  border-bottom: ${({ split }) => (split ? '1px solid #d8d8d8' : 0)};
`;

function Dropdown({
  options,
  title = '',
  tooltip = '',
  isIconButton = false,
  iconButtonProps,
  buttonProps,
  onClickOption,
}: IDropdownProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOptionClick = useCallback(
    (key: string) => () => {
      if (onClickOption instanceof Function) {
        onClickOption(key);
      }

      handleClose();
    },
    [onClickOption, handleClose],
  );

  return (
    <ThemeProvider theme={theme as ThemeOptions}>
      {isIconButton ? (
        <Tooltip arrow title={tooltip} aria-label={tooltip}>
          <IconButton onClick={handleClick} {...iconButtonProps}>
            {title}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          aria-haspopup="true"
          aria-expanded={isOpen && 'true'}
          onClick={handleClick}
          startIcon={buttonProps?.startIcon}
          variant={buttonProps?.variant}
          color={buttonProps?.color}
        >
          {title}
        </Button>
      )}
      <Menu sx={{ marginTop: '3px' }} anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        {options?.map(({ key, label, disabled, split }) => (
          <MenuList key={key} split={split || false}>
            <MenuItem onClick={handleOptionClick(key)} disabled={disabled}>
              {label}
            </MenuItem>
          </MenuList>
        ))}
      </Menu>
    </ThemeProvider>
  );
}

export default Dropdown;
