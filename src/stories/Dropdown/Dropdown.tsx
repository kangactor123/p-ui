import React, { MouseEvent, ReactElement, useCallback, useContext, useState } from 'react';
import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  MenuItem,
  SxProps,
  Theme,
  PopoverOrigin,
  ThemeProvider,
} from '@mui/material';
import Tooltip from '../Tooltip';
import { PlayceThemeContext } from '../../providers';
import { SerializedStyles } from '@emotion/react';
import { TSize, TTooltipPlacement } from '../../common/type';
import { Size } from '../../common/enum';
import { Menu, MenuList, SplitLine, Header, MenuContainer } from './Dropdown.style';

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
  isIconButton?: boolean;
  iconButtonProps?: IconButtonProps;
  buttonProps?: ButtonProps;
  onClickOption?: (key: string, id?: number) => void;
  menuSx?: SxProps<Theme>;
  size?: TSize | 'mini';
  positionProps?: {
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
  };
  tooltip?: string;
  tooltipPlacement?: TTooltipPlacement;
  header?: string;
}

function Dropdown({
  options,
  title = '',
  tooltip = '',
  tooltipPlacement,
  isIconButton = false,
  iconButtonProps,
  buttonProps,
  onClickOption,
  menuSx,
  size = Size.M,
  positionProps,
  header,
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
    <>
      {/* <ThemeProvider theme={theme as Theme}> */}
      {isIconButton ? (
        <Tooltip arrow title={tooltip} aria-label={tooltip} placement={tooltipPlacement}>
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
        {header ? <Header>{header}</Header> : null}
        <MenuContainer>
          {options?.map(({ key, label, disabled, split, liCss }) => [
            <MenuList key={key} css={liCss}>
              <MenuItem onClick={handleOptionClick(key)} disabled={disabled}>
                {label}
              </MenuItem>
            </MenuList>,
            split ? <SplitLine /> : null,
          ])}
        </MenuContainer>
      </Menu>
      {/* </ThemeProvider> */}
    </>
  );
}

export default Dropdown;
