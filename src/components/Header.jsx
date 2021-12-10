import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        className="profile-button"
      >
        <i className="bi bi-person-circle" />
      </button>
    </div>
  );
}
