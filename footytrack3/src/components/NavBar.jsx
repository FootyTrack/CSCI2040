// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiSoccerBall } from 'react-icons/gi';
import { FaChevronDown } from 'react-icons/fa';

const Navbar = ({ isLoggedIn }) => {
  const [isCompareHovered, setIsCompareHovered] = useState(false);

  return (
    <nav
      style={{
        width: '100%',
        height: '70px',          // Taller navbar
        backgroundColor: '#00FFBF', // Teal color
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        color: '#000'
      }}
    >
      {/* Left: FootyTrack (Home Link) */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#000',
          // Use Lobster font here
          fontFamily: 'Lobster, cursive',
          fontSize: '1.8rem',
          marginRight: '2rem',
          fontWeight: 'normal' // Lobster is already decorative, so we can keep 'normal' or adjust if needed
        }}
      >
        <GiSoccerBall style={{ marginRight: '0.5rem', fontSize: '1.5rem' }} />
        FootyTrack
      </Link>

      {/* Center Nav Links */}
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '2rem',
          flex: 1
        }}
      >
        <li>
  <Link
    to="/teams"
    style={{
      color: '#000',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
  >
    Teams
  </Link>
</li>

<li>
  <Link
    to="/players"
    style={{
      color: '#000',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
  >
    Players
  </Link>
</li>


        {/* Compare with hover-based dropdown */}
        <li
          style={{ position: 'relative' }}
          onMouseEnter={() => setIsCompareHovered(true)}
          onMouseLeave={() => setIsCompareHovered(false)}
        >
          <span
            style={{
              color: '#000',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '1rem',
              fontWeight: 'bold' // Bold text
            }}
          >
            Compare
            <FaChevronDown
              style={{
                fontSize: '0.75rem', // Smaller arrow
                marginLeft: '0.25rem'
              }}
            />
          </span>

          {isCompareHovered && (
  <ul
    style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      backgroundColor: '#00FFBF',
      listStyle: 'none',
      margin: 0,
      padding: '0.5rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }}
  >
    <li style={{ padding: '0.25rem 0' }}>
      <Link
        to="/compare/teams"
        style={{
          color: '#000',
          textDecoration: 'none',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.textDecoration = 'underline')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.textDecoration = 'none')
        }
      >
        Teams
      </Link>
    </li>
    <li style={{ padding: '0.25rem 0' }}>
      <Link
        to="/compare/players"
        style={{
          color: '#000',
          textDecoration: 'none',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.textDecoration = 'underline')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.textDecoration = 'none')
        }
      >
        Players
      </Link>
    </li>
  </ul>
)}

        </li>
      </ul>

      {/* Right: Favorites or Login */}
      <div>
        {isLoggedIn ? (
          <Link
            to="/favorites"
            style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 'bold' // Bold text
            }}
          >
            Favorites
          </Link>
        ) : (
          <Link
            to="/login"
            style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 'bold' // Bold text
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
