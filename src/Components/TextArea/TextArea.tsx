import clsx from 'clsx';
import styles from './TextArea.module.scss';
import { ChangeEvent } from 'react';
import { Box } from '../Box/Box';

interface TextAreaProps {
  className?: string;
  containerClassName?: string;
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  className,
  containerClassName,
  name,
  value,
  onChange,
}: TextAreaProps) => {
  return (
    <Box
      className={clsx(
        styles.textareaWrapper,
        containerClassName && containerClassName
      )}
    >
      <textarea
        className={clsx(styles.textarea, className && className)}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </Box>
  );
};
