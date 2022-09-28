import React, { MouseEvent, ReactElement, useCallback, useState } from 'react';
import { Button, ButtonProps, IconButton, IconButtonProps, Menu, MenuItem } from '@mui/material';
import Tooltip from '../Tooltip';

export interface IOptionsType {
  key: string;
  label: ReactElement | string;
  disabled?: boolean;
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

function Dropdown({
  options,
  title = '',
  tooltip = '',
  isIconButton = false,
  iconButtonProps,
  buttonProps,
  onClickOption,
}: IDropdownProps): ReactElement {
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
    <>
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
        {options?.map(({ key, label, disabled }) => (
          <MenuItem key={key} onClick={handleOptionClick(key)} disabled={disabled}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default Dropdown;
