import React, { ReactElement, useContext } from 'react';
import { cx } from '@emotion/css';
import { Wrapper } from './FormGroup.style';
import { PlayceThemeContext, ThemeProvider } from '../../../providers';

export interface IFormGroupProps {
  title: string;
  children?: ReactElement;
}

function FormGroup({ title, children }: IFormGroupProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <hr className={cx('group-header-hr')} />
        <div className={cx('group-header-label')}>{title}</div>
        {children}
      </Wrapper>
    </ThemeProvider>
  );
}

export default FormGroup;
