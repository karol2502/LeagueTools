import { ApiConfig } from '../Models/ApiConfig';
import { TauriHttpClient } from './TauriHttpClient';

export const LeagueService = (config: ApiConfig) => {
  return {
    setStatus: async (status: string) => {
      return await TauriHttpClient.put(
        `${config.baseUrl}/lol-chat/v1/me/`,
        config.token,
        { statusMessage: status }
      );
    },
    getCurrentSummoner: async () => {
      return await TauriHttpClient.get(
        `${config.baseUrl}/lol-summoner/v1/current-summoner`,
        config.token
      );
    },
    getGameSession: async () => {
      return await TauriHttpClient.get(
        `${config.baseUrl}/lol-gameflow/v1/session`,
        config.token
      );
    },
    acceptGame: async () => {
      return await TauriHttpClient.post(
        `${config.baseUrl}/lol-matchmaking/v1/ready-check/accept`,
        config.token
      );
    },
  };
};
