import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { LCUData } from '../Models/LCUData';
import { invoke } from '@tauri-apps/api';
import { LeagueService } from '../Services/LeagueService';
import { ApiConfig } from '../Models/ApiConfig';
import { LeagueApi } from '../Models/LeagueApi';
import { toast } from 'react-toastify';
import { Text } from '../Components/Text/Text';

interface LeagueContextProps {
  leagueApi: LeagueApi;
  isLCUConnected: boolean;
  tryReconnectLCU: () => void;
}

const LeagueContext = createContext<LeagueContextProps>({
  leagueApi: {} as LeagueApi,
  isLCUConnected: true,
  tryReconnectLCU: () => {},
});

export const useLeagueContext = () => {
  return useContext(LeagueContext);
};

interface LeagueContextProviderProps {
  children: ReactNode;
}

// Initial path is used to prevent quick hiding 'Reconnect' button
const lockfileInitialPath = 'null';

export const LeagueContextProvider = ({
  children,
}: LeagueContextProviderProps) => {
  const [lockfilePath, setLockfilePath] = useState<string>(lockfileInitialPath);
  const [lcuData, setLcuData] = useState<LCUData>();
  const lockfileCheckingInterval = useRef<NodeJS.Timeout>();

  const config: ApiConfig = {
    baseUrl: `${lcuData?.protocol}://127.0.0.1:${lcuData?.port}`,
    token: btoa(`riot:${lcuData?.password}`),
  };

  const checkIfLockfileExist = (path: string) => {
    invoke<boolean>('check_if_path_is_file', { path: path }).then(
      (isFile: boolean) => {
        if (!isFile) {
          setLockfilePath('');
          clearInterval(lockfileCheckingInterval.current);
          toast.error(
            <div>
              <Text fontSize="sm">Disconnected from League client!</Text>
            </div>
          );
        }
      }
    );
  };

  const getLockfilePath = () => {
    invoke<string>('get_lockfile_path')
      .then((path: string) => {
        setLockfilePath(path);
        toast.success(
          <div>
            <Text fontSize="sm">Connected to League client!</Text>
          </div>
        );
      })
      .catch(() => {
        setLockfilePath('');
        toast.error(
          <div>
            <Text fontSize="sm">
              Can not find League of Legends client process! Try restart client
              and click 'Reconnect' button
            </Text>
          </div>
        );
      });
  };

  useEffect(() => {
    getLockfilePath();
  }, []);

  useEffect(() => {
    if (lockfilePath && lockfilePath !== lockfileInitialPath) {
      console.log(lockfilePath);
      invoke<string>('read_file_from_path', { path: lockfilePath })
        .then((value: string) => {
          if (value) {
            const parts = value.split(':');
            setLcuData({
              processName: parts[0],
              processId: parseInt(parts[1]),
              port: parseInt(parts[2]),
              password: parts[3],
              protocol: parts[4],
            } as LCUData);
          }
        })
        .catch((error) => console.log(error));

      lockfileCheckingInterval.current = setInterval(
        () => checkIfLockfileExist(lockfilePath),
        5000
      );
    }

    return () => {
      clearInterval(lockfileCheckingInterval.current);
    };
  }, [lockfilePath]);

  return (
    <LeagueContext.Provider
      value={{
        leagueApi: LeagueService(config),
        isLCUConnected: !!lockfilePath,
        tryReconnectLCU: getLockfilePath,
      }}
    >
      {children}
    </LeagueContext.Provider>
  );
};
