import { useLeagueContext } from '../../Contexts/LeagueContext';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

import styles from './LCUStatus.module.scss';

export const LCUStatus = () => {
  const { isLCUConnected, tryReconnectLCU } = useLeagueContext();

  return (
    !isLCUConnected && (
      <Button className={styles.button} onClick={() => tryReconnectLCU()}>
        <Text fontSize="sm">Reconnect</Text>
      </Button>
    )
  );
};
