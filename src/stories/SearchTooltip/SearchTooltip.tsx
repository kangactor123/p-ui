import React, { ReactElement, useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import Tooltip from '../Tooltip';
import { SearchIcon } from './SearchTooltip.style';
import { TTooltipPlacement } from '../../common/type';

export interface ISearchTooltipProps {
  tooltip: string;
  placement?: TTooltipPlacement;
}

function SearchTooltip({ tooltip, placement = 'bottom' }: ISearchTooltipProps): ReactElement {
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        title={tooltip}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement={placement}
      >
        <SearchIcon onClick={handleTooltipOpen} />
      </Tooltip>
    </ClickAwayListener>
  );
}

export default SearchTooltip;
