import React, { MouseEvent, ReactElement, useCallback, useContext, useMemo, useState } from 'react';
import {
  ButtonProps,
  IconButton,
  IconButtonProps,
  MenuItem,
  SxProps,
  Theme,
  PopoverOrigin,
  ThemeProvider,
  Popper,
  ClickAwayListener,
  Grow,
  Paper,
  PopperPlacementType,
  PopperProps,
} from '@mui/material';
import Tooltip from '../Tooltip';
import { PlayceThemeContext } from '../../providers';
import { SerializedStyles } from '@emotion/react';
import { TSize, TTooltipPlacement } from '../../common/type';
import { Size } from '../../common/enum';
import { Menu, MenuList, SplitLine, Header, MenuContainer, paper } from './Dropdown.style';
import Button from '../Button';

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
  useScroll?: boolean;
  popperProps?: Omit<PopperProps, 'open' | 'children'>;
  placement?: PopperPlacementType;
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
  useScroll = false,
  popperProps,
  placement,
}: IDropdownProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
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

  const Compo = useMemo(
    () => (
      <div>
        {header && <Header>{header}</Header>}
        <MenuContainer>
          {options?.map(({ key, label, disabled, split, liCss }, index) => [
            <MenuList key={key} css={liCss}>
              <MenuItem onClick={handleOptionClick(key)} disabled={disabled}>
                {label}
              </MenuItem>
            </MenuList>,
            split && <SplitLine key={index} />,
          ])}
        </MenuContainer>
      </div>
    ),
    [handleOptionClick, header, options],
  );

  return (
    <ThemeProvider theme={theme as Theme}>
      {isIconButton ? (
        <Tooltip arrow title={tooltip} aria-label={tooltip} placement={tooltipPlacement}>
          <IconButton onClick={handleClick} {...iconButtonProps}>
            {title}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          {...buttonProps}
          buttonRef={anchorEl}
          onClick={handleClick}
          startIcon={buttonProps?.startIcon}
          variant={buttonProps?.variant}
          color={buttonProps?.color}
        >
          {title}
        </Button>
      )}
      {useScroll ? (
        <Popper {...popperProps} open={open} anchorEl={anchorEl} transition placement={placement || 'bottom'}>
          {({ placement, TransitionProps }) => (
            <ClickAwayListener onClickAway={handleClose}>
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
              >
                <Paper sx={paper}>{Compo}</Paper>
              </Grow>
            </ClickAwayListener>
          )}
        </Popper>
      ) : (
        <Menu sx={{ ...menuSx }} anchorEl={anchorEl} open={open} onClose={handleClose} size={size} {...positionProps}>
          {Compo}
        </Menu>
      )}
    </ThemeProvider>
  );
}

export default Dropdown;
