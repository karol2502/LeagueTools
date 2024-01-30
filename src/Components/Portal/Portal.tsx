import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const portal = document.getElementById('portal-root');
  const el = document.createElement('div');

  useEffect(() => {
    portal?.appendChild(el);
    return () => {
      portal?.removeChild(el);
    };
  }, [el, portal]);

  return createPortal(children, el);
};
