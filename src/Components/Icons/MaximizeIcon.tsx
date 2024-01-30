import clsx from 'clsx';
import { IconProps } from './Icon';

export const MaximizeIcon = ({ className, ...rest }: IconProps) => {
  return (
    <svg
      className={clsx(className && className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path fill="currentColor" d="M4 4h16v16H4zm2 4v10h12V8z" />
    </svg>
  );
};
