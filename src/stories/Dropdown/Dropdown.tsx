import React, { MouseEvent, ReactElement, useCallback, useContext, useState } from 'react';
import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import Tooltip from '../Tooltip';
import { PlayceThemeContext } from '../../providers';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

export interface IOptionsType {
  key: string;
  label: ReactElement | string;
  disabled?: boolean;
  split?: boolean;
  liCss?: SerializedStyles;
}

export interface IDropdownProps {
  options: IOptionsType[];
  title?: string | ReactElement;
  tooltip?: string;
  isIconButton?: boolean;
  iconButtonProps?: IconButtonProps;
  buttonProps?: ButtonProps;
  onClickOption?: (key: string, id?: number) => void;
  menuSx?: SxProps<Theme>;
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
  menuSx,
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
      <Menu sx={{ marginTop: '3px', ...menuSx }} anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        {options?.map(({ key, label, disabled, split, liCss }) => (
          <MenuList key={key} split={split || false} css={liCss}>
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
