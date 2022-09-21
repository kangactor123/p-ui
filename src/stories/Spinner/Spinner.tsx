import React, { ReactElement } from 'react';
import ReactLoading from 'react-loading';
import styled from '@emotion/styled';

/**
 * Spinner Component
 * @returns Spinner
 */

export enum SpinnerSize {
  small = 20,
  medium = 60,
  large = 100,
}

export enum SpinnerType {
  blank = 'blank',
  balls = 'balls',
  bars = 'bars',
  bubbles = 'bubbles',
  cubes = 'cubes',
  cylon = 'cylon',
  spin = 'spin',
  spinningBubbles = 'spinningBubbles',
  spokes = 'spokes',
}

export interface ISpinnerProps {
  loading?: boolean;
  size?: SpinnerSize;
  type?: SpinnerType;
  color?: string;
  height?: number | string;
  width?: number | string;
  className?: any;
  fixed?: boolean;
}

const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);

  &.fixed {
    position: fixed;
    left: 0;
  }

  &.target-page {
    z-index: 10000 !important;
    background-color: rgba(255, 255, 255, 1) !important;
  }
`;

const Loading = styled(ReactLoading)`
  margin: auto;
`;

function Spinner(props: ISpinnerProps): ReactElement {
  const {
    loading = true,

    width = 0,
    height = 0,
    size = SpinnerSize.large,

    className = '',
  } = props;

  const { color = 'black', type = SpinnerType.bars, ...otherProps } = props;

  const widthHeight =
    width && height
      ? {
          width,
          height,
        }
      : {
          width: size,
          height: size,
        };

  return loading ? (
    <Wrapper className={className}>
      <Loading key={Math.random()} color={color} type={type} {...widthHeight} {...otherProps} />
    </Wrapper>
  ) : (
    <></>
  );
}

export default Spinner;
