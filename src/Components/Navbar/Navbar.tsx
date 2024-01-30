import { NavLink } from 'react-router-dom';
import { HomeIcon } from '../Icons/HomeIcon';
import { ProfileIcon } from '../Icons/ProfileIcon';

import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { Tooltip } from '../Tooltip/Tooltip';
import { Box } from '../Box/Box';
import { CheckIcon } from '../Icons/CheckIcon';

export const Navbar = () => {
  return (
    <Box
      id="navbar"
      className={styles.container}
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <NavLink id="home" to="/">
        {({ isActive }) => (
          <Tooltip
            title="Home"
            className={clsx(styles.iconContainer, {
              [styles.active]: isActive,
            })}
            offset={15}
          >
            <HomeIcon
              className={clsx(styles.icon, { [styles.active]: isActive })}
            />
          </Tooltip>
        )}
      </NavLink>
      <NavLink id="status" to="status">
        {({ isActive }) => (
          <Tooltip
            title="Profile"
            className={clsx(styles.iconContainer, {
              [styles.active]: isActive,
            })}
            offset={15}
          >
            <ProfileIcon
              className={clsx(styles.icon, { [styles.active]: isActive })}
            />
          </Tooltip>
        )}
      </NavLink>
      <NavLink id="auto-accept" to="auto-accept">
        {({ isActive }) => (
          <Tooltip
            title="Auto accept"
            className={clsx(styles.iconContainer, {
              [styles.active]: isActive,
            })}
            offset={15}
          >
            <CheckIcon
              className={clsx(styles.icon, { [styles.active]: isActive })}
            />
          </Tooltip>
        )}
      </NavLink>
    </Box>
  );
};
