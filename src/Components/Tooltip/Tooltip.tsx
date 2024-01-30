import clsx from 'clsx';
import { MouseEvent, ReactNode, useState } from 'react';
import { Portal } from '../Portal/Portal';

import styles from './Tooltip.module.scss';
import { Text } from '../Text/Text';
import { Box } from '../Box/Box';

interface TooltipProps {
  children: ReactNode;
  className?: string;
  title: string;
  offset?: number;
}

export const Tooltip = ({
  className,
  children,
  title,
  offset,
}: TooltipProps) => {
  const [coords, setCoords] = useState<Partial<DOMRect>>({});
  const [isTooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const mouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords(rect);
    setTooltipOpen(true);
  };

  const mouseLeave = () => {
    setTooltipOpen(false);
  };

  return (
    <div
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className={clsx(className && className)}
    >
      {children}
      {isTooltipOpen && (
        <Portal>
          <Box
            alignItems="center"
            style={{
              left: coords.left! + coords.width! + (offset ?? 0),
              top: coords.top,
            }}
            className={styles.tooltip}
          >
            <Text fontSize="md">{title}</Text>
          </Box>
        </Portal>
      )}
    </div>
  );
};
