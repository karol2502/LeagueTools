import clsx from 'clsx';

import styles from './Text.module.scss';

type BeaufortProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  fontFamily?:
    | 'regular'
    | 'medium'
    | 'medium-italic'
    | 'light'
    | 'light-italic'
    | 'italic'
    | 'heavy'
    | 'heavy-italic'
    | 'bold'
    | 'bold-italic';
};

type SpiegelProps = {
  as?: 'p' | 'span';
  fontFamily?:
    | 'regular'
    | 'regular-italic'
    | 'semibold'
    | 'semibold-italic'
    | 'bold'
    | 'bold-italic';
};

type TextProps = {
  className?: string;
  children: string | number;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
} & (BeaufortProps | SpiegelProps);

export const Text = ({
  children,
  as: Tag = 'span',
  className,
  fontFamily = 'regular',
  fontSize,
  ...rest
}: TextProps) => {
  return (
    <Tag
      className={clsx(
        className && className,
        fontFamily && styles[fontFamily],
        fontSize && styles[fontSize],
        styles.typography
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
