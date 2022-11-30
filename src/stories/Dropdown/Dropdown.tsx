import React, { MouseEvent, ReactElement, useCallback, useContext, useState } from 'react';
import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Menu as MuiMenu,
  MenuItem,
  SxProps,
  Theme,
  ThemeOptions,
  styled as MUIStyled,
  PopoverOrigin,
  ThemeProvider,
} from '@mui/material';
import Tooltip from '../Tooltip';
import { PlayceThemeContext } from '../../providers';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';
import { TSize } from '../../common/type';

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
  size?: 'small' | 'medium' | 'large' | 'mini' | string;
  positionProps?: {
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
  };
}

const Menu = MUIStyled(MuiMenu)<TSize>(({ size }) => ({
  '& .MuiPaper-root': {
    boxShadow: 'none',
    filter: 'drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2))',
    borderRadius: '8px',
    // transform: 'translateY(10px) !important',
  },
  '& .MuiList-root': {
    minWidth:
      size === 'mini'
        ? '160px'
        : size === 'small'
        ? '200px'
        : size === 'medium'
        ? '220px'
        : size === 'large'
        ? '240px'
        : size,
  },
}));

const MenuList = styled.li``;

const SplitLine = styled.hr`
  border: 0.5px solid #e6e9ef;
  margin: 0;
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
  size = 'medium',
  positionProps,
}: IDropdownProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.currentTarget.blur();
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
          {...buttonProps}
        >
          {title}
        </Button>
      )}
      <Menu sx={{ ...menuSx }} anchorEl={anchorEl} open={isOpen} onClose={handleClose} size={size} {...positionProps}>
        {options?.map(({ key, label, disabled, split, liCss }) => [
          <MenuList key={key} css={liCss}>
            <MenuItem onClick={handleOptionClick(key)} disabled={disabled}>
              {label}
            </MenuItem>
          </MenuList>,
          split ? <SplitLine /> : null,
        ])}
      </Menu>
    </ThemeProvider>
  );
}

export default Dropdown;
