import React, { MouseEvent, ReactElement, useCallback, useContext, useState } from 'react';
import {
  ButtonProps,
  IconButton,
  IconButtonProps,
  MenuItem,
  Theme,
  ThemeProvider,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  PopperPlacementType,
  PopperProps,
} from '@mui/material';
import Tooltip from '../Tooltip';
import { PlayceThemeContext } from '../../providers';
import { TTooltipPlacement } from '../../common/type';
import { MenuList, SplitLine, Header, MenuContainer } from './Dropdown.style';
import Button from '../Button';
import { IOptionsType } from '../Dropdown';

export interface IPopperDropdownProps {
  options: IOptionsType[];
  tooltip?: string;
  title?: string | ReactElement;
  header?: string;
  buttonProps?: ButtonProps;
  isIconButton?: boolean;
  iconButtonProps?: IconButtonProps;
  popperProps?: Omit<PopperProps, 'open' | 'children'>;
  tooltipPlacement?: TTooltipPlacement;
  placement?: PopperPlacementType;
  onClickOption?: (key: string, id?: number) => void;
}

const paper = {
  boxShadow: 'none',
  filter: 'drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2))',
  borderRadius: '8px',
  transform: 'translateY(10px) !important',
  maxHeight: 'fit-content',
};

function PopperDropdown({
  options,
  title = '',
  tooltip = '',
  tooltipPlacement,
  isIconButton = false,
  iconButtonProps,
  buttonProps,
  onClickOption,
  placement, //popper 위치 수정
  popperProps,
  header,
}: IPopperDropdownProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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
      <Popper {...popperProps} open={open} anchorEl={anchorEl} transition placement={placement || 'bottom'}>
        {({ placement, TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}>
              <Paper sx={paper}>
                {header && <Header>{header}</Header>}
                <MenuContainer>
                  {options?.map(({ key, label, disabled, split, liCss }) => [
                    <MenuList key={key} css={liCss} id="menu-list-grow">
                      <MenuItem onClick={handleOptionClick(key)} disabled={disabled}>
                        {label}
                      </MenuItem>
                    </MenuList>,
                    split && <SplitLine />,
                  ])}
                </MenuContainer>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </ThemeProvider>
  );
}

export default PopperDropdown;
