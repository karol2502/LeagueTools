import { ReactNode } from 'react';
import { useLeagueContext } from '../../Contexts/LeagueContext';

interface RenderWithConnectionProps {
  children: (isLCUConnected: boolean) => ReactNode;
}

export const RenderWithConnection = ({
  children,
}: RenderWithConnectionProps) => {
  const { isLCUConnected } = useLeagueContext();

  return children(isLCUConnected);
};
