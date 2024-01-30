import clsx from 'clsx';
import { CSSProperties, MouseEvent, ReactNode } from 'react';

import styles from './Box.module.scss';
import { noop } from 'lodash';

interface BoxProps {
  children: ReactNode;
  className?: string;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  fullHeight?: boolean;
  fullWidth?: boolean;
  justifyContent?:
    | 'normal'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?:
    | 'normal'
    | 'center'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end'
    | 'flex-start'
    | 'flex-end';
  id?: string;
  style?: CSSProperties;
  flexGrow?: number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Box = ({
  children,
  alignItems = 'normal',
  className,
  flexDirection = 'row',
  fullHeight = false,
  fullWidth = false,
  justifyContent = 'normal',
  id,
  style,
  flexGrow = 0,
  onClick = noop,
  ...rest
}: BoxProps) => {
  return (
    <div
      id={id}
      className={clsx(className && className, {
        [styles.fullHeight]: fullHeight,
        [styles.fullWidth]: fullWidth,
      })}
      style={{
        display: 'flex',
        flexGrow,
        alignItems,
        flexDirection,
        justifyContent,
        ...(style && style),
      }}
      onClick={(e) => onClick(e)}
      {...rest}
    >
      {children}
    </div>
  );
};
