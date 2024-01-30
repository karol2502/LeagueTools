import clsx from 'clsx';
import { IconProps } from './Icon';

export const MinimizeIcon = ({ className, ...rest }: IconProps) => {
  return (
    <svg
      className={clsx(className && className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path fill="currentColor" d="M20 14H4v-4h16" />
    </svg>
  );
};
