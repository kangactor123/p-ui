import React, { ReactElement } from 'react';
import { cx } from '@emotion/css';
import { Wrapper } from './FormGroup.style';

export interface IFormGroupProps {
  title: string;
  children?: ReactElement;
}

function FormGroup({ title, children }: IFormGroupProps): ReactElement {
  return (
    <Wrapper>
      <div className={cx('group-header-label')}>{title}</div>
      <hr className={cx('group-header-hr')} />
      {children}
    </Wrapper>
  );
}

export default FormGroup;
