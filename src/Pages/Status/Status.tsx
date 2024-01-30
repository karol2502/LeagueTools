import { useState } from 'react';
import { useLeagueContext } from '../../Contexts/LeagueContext';
import { Box } from '../../Components/Box/Box';
import { Button } from '../../Components/Button/Button';
import { Text } from '../../Components/Text/Text';
import { TextArea } from '../../Components/TextArea/TextArea';

import styles from './Status.module.scss';
import { RenderWithConnection } from '../../Components/RenderWithConnection/RenderWithConnection';
import { toast } from 'react-toastify';

const Status = () => {
  const [status, setStatus] = useState('');

  const { leagueApi } = useLeagueContext();

  const handleSetStatus = () => {
    leagueApi.setStatus(status).then(() =>
      toast.success(
        <div>
          <Text fontSize="sm">Status set successfully!</Text>
        </div>
      )
    );
  };

  return (
    <Box
      id="status-page-container"
      flexDirection="column"
      alignItems="flex-start"
      flexGrow={1}
      className={styles.container}
    >
      <Text fontSize="sm">Set your status without character limit!</Text>
      <TextArea
        className={styles.textarea}
        containerClassName={styles.containerTextarea}
        value={status}
        onChange={(e) => setStatus(e.currentTarget.value)}
      />
      <RenderWithConnection>
        {(isLCUConnected) => (
          <Button disabled={!isLCUConnected} onClick={() => handleSetStatus()}>
            Set status
          </Button>
        )}
      </RenderWithConnection>
    </Box>
  );
};

export default Status;
