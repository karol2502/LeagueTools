import { appWindow } from '@tauri-apps/api/window';

import styles from './TitleBar.module.scss';
import { CloseIcon } from '../Icons/CloseIcon';
import { MaximizeIcon } from '../Icons/MaximizeIcon';
import { MinimizeIcon } from '../Icons/MinimizeIcon';
import { Text } from '../Text/Text';
import { Box } from '../Box/Box';
import { LCUStatus } from '../LCUStatus/LCUStatus';

export const TitleBar = () => {
  return (
    <Box
      data-tauri-drag-region
      className={styles.titlebar}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        className={styles.leftGroup}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text as="h4" data-tauri-drag-region className={styles.title}>
          League tools
        </Text>
        <LCUStatus />
      </Box>

      <Box data-tauri-drag-region className={styles.buttons}>
        <Box className={styles.button} onClick={() => appWindow.minimize()}>
          <MinimizeIcon />
        </Box>
        <Box
          className={styles.button}
          onClick={() => appWindow.toggleMaximize()}
        >
          <MaximizeIcon />
        </Box>
        <Box className={styles.button} onClick={() => appWindow.close()}>
          <CloseIcon />
        </Box>
      </Box>
    </Box>
  );
};
