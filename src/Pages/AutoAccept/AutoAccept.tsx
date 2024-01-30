import { useRef, useState } from 'react';
import { Box } from '../../Components/Box/Box';
import { Button } from '../../Components/Button/Button';
import { RenderWithConnection } from '../../Components/RenderWithConnection/RenderWithConnection';
import { useLeagueContext } from '../../Contexts/LeagueContext';

import styles from './AutoAccept.module.scss';
import clsx from 'clsx';
import { Text } from '../../Components/Text/Text';
import { toast } from 'react-toastify';

const AutoAccept = () => {
  const [isAutoAcceptRunning, setIsAutoAcceptRunning] =
    useState<boolean>(false);
  const { leagueApi } = useLeagueContext();
  const autoAcceptInterval = useRef<NodeJS.Timeout>();

  const handleAutoAccept = () => {
    leagueApi.getGameSession().then((respose): void => {
      console.log(respose);
      if (respose.status !== 200) {
        return;
      }

      if (respose.data.phase === 'ReadyCheck') {
        leagueApi
          .acceptGame()
          .then(() => {
            toast.success(
              <div>
                <Text fontSize="sm">Game accepted successfully!</Text>
              </div>,
              { autoClose: false }
            );
          })
          .finally(() => {
            setIsAutoAcceptRunning(false);
            clearInterval(autoAcceptInterval.current);
          });
      }
    });
  };

  const handleToogleAutoAccept = () => {
    if (isAutoAcceptRunning) {
      setIsAutoAcceptRunning(false);
      clearInterval(autoAcceptInterval.current);
    } else {
      setIsAutoAcceptRunning(true);
      autoAcceptInterval.current = setInterval(() => handleAutoAccept(), 4000);
    }
  };

  return (
    <Box
      className={styles.container}
      id="auto-accept-page-container"
      flexDirection="column"
      alignItems="flex-start"
      flexGrow={1}
    >
      <Text fontSize="sm">
        After enabling you can not switch tabs or AutoAccept will disable
      </Text>
      <RenderWithConnection>
        {(isLCUConnected) => (
          <Button
            className={clsx(styles.button, {
              [styles.enable]: !isAutoAcceptRunning,
              [styles.disable]: isAutoAcceptRunning,
            })}
            disabled={!isLCUConnected}
            onClick={() => handleToogleAutoAccept()}
          >
            {isAutoAcceptRunning ? 'Disable AutoAccept' : 'Enable AutoAccept'}
          </Button>
        )}
      </RenderWithConnection>
    </Box>
  );
};

export default AutoAccept;
