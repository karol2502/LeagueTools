import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({
  children,
  onClick,
  className,
  ...rest
}: ButtonProps & Partial<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={clsx(styles.button, className && className)}
      onClick={(e) => onClick(e)}
      {...rest}
    >
      {children}
    </button>
  );
};
