import React, { ReactElement, useCallback, useContext } from 'react';
import { css } from '@emotion/react';
import { DropdownDownIcon } from '../icons';
import { IAccordionProps } from './type';
import { AccordionDetails, AccordionPanel, AccordionSummary } from './style';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

function Accordion({
  summaryProps: {
    iconPosition = 'right',
    useEdgeEndIcon = true,
    children: summaryChildren,
    ...summaryProps
  },
  detailsProps,
  children,
  name,
  defaultExpanded = true,
  onChange,
  ...props
}: IAccordionProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  const handleChange = useCallback(
    (event: React.SyntheticEvent, expanded: boolean) => {
      if (onChange instanceof Function) {
        onChange(name, expanded);
      }
    },
    [onChange, name],
  );

  return (
    <ThemeProvider theme={theme}>
      <AccordionPanel defaultExpanded={defaultExpanded} onChange={handleChange} {...props}>
        <AccordionSummary
          css={css({
            '& .MuiAccordionSummary-content,& .MuiAccordionSummary-content.Mui-expanded': {
              marginLeft: iconPosition === 'start' ? '6px' : '0px',
              ...(iconPosition === 'right'
                ? { ...{ flexGrow: '0', marginRight: '8px' } }
                : { undefined }),
            },
            flexDirection: iconPosition === 'start' ? 'row-reverse' : undefined,
            justifyContent: iconPosition === 'right' ? 'start !important' : 'center',
            '& .MuiAccordionSummary-expandIconWrapper': {
              transform: 'rotate(270deg)',
            },
          })}
          expandIcon={useEdgeEndIcon ? <DropdownDownIcon /> : null}
          {...summaryProps}
        >
          {summaryChildren}
        </AccordionSummary>
        <AccordionDetails {...detailsProps}>{children}</AccordionDetails>
      </AccordionPanel>
    </ThemeProvider>
  );
}

export default Accordion;
