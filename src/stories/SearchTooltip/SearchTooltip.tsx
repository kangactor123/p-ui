import React, { ReactElement } from 'react';
import { ClickAwayListener } from '@mui/material';
import Tooltip from '../Tooltip';
import { cx } from '@emotion/css';
import { SearchIcon } from './SearchTooltip.style';
import { TTooltipPlacement } from '../../common/type';
// import { useTranslation } from 'react-i18next';

export interface ISearchTooltipProps {
  //Todo: define props
  tooltip: string;
  placement?: TTooltipPlacement;
}

function SearchTooltip({ tooltip, placement = 'bottom' }: ISearchTooltipProps): ReactElement {
  // const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

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
