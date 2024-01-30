import { ChangeEvent } from 'react';

import styles from './TextInput.module.scss';
import clsx from 'clsx';

interface TextInputProps {
  className?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({ className, onChange, value }: TextInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={clsx(styles.input, className && className)}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
