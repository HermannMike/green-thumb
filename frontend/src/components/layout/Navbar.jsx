import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>GreenThumb</h1>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/reminders"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            Reminders
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/plants"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            Plants
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/login"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            Login
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/signup"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 30px',
    background: 'linear-gradient(90deg, #4caf50 0%, #81c784 100%)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
  },
  title: {
    color: '#fff',
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.8rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '25px',
  },
  navLink: {
    color: '#e8f5e9',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    padding: '6px 10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  activeNavLink: {
    backgroundColor: '#2e7d32',
    color: '#fff',
  },
};

export default Navbar;
