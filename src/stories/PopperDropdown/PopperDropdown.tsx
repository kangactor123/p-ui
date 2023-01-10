import React, { MouseEvent, ReactElement, useCallback, useContext, useRef, useState } from 'react';
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
  Grow,
  ClickAwayListener,
  Paper,
} from '@mui/material';
import Tooltip from '../Tooltip';
import { PlayceThemeContext } from '../../providers';
import { SerializedStyles } from '@emotion/react';
import { TSize, TTooltipPlacement } from '../../common/type';
import { Size } from '../../common/enum';
import { Menu, MenuList, SplitLine, Header, MenuContainer } from './Dropdown.style';
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
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  // const isOpen = Boolean(anchorEl);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    // event.currentTarget.blur();
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

  console.log(anchorRef);

  // const poperPlacement: PopperPlacementType = props.placement !== undefined ? props.placement : 'bottom'; // default value로 설정

  return (
    <ThemeProvider theme={theme as Theme}>
      {isIconButton ? (
        <Tooltip arrow title={tooltip} aria-label={tooltip} placement={tooltipPlacement}>
          <IconButton onClick={handleClick} ref={anchorRef} {...iconButtonProps}>
            {title}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          ref={anchorRef}
          aria-haspopup="true"
          // aria-expanded={isOpen && 'true'}
          onClick={handleClick}
          startIcon={buttonProps?.startIcon}
          variant={buttonProps?.variant}
          color={buttonProps?.color}
          {...buttonProps}
        >
          {title}
        </Button>
      )}
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition placement="bottom">
        {({ placement, TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}>
            <ClickAwayListener onClickAway={handleClose}>
              <Paper>
                {header && <Header>{header}</Header>}
                <MenuContainer>
                  {options?.map(({ key, label, disabled, split, liCss }) => [
                    <MenuList key={key} css={liCss}>
                      <MenuItem onClick={handleOptionClick(key)} disabled={disabled}>
                        {label}
                      </MenuItem>
                    </MenuList>,
                    split && <SplitLine />,
                  ])}
                </MenuContainer>
              </Paper>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </ThemeProvider>
  );
}

export default Dropdown;
