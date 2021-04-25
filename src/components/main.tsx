import React from 'react';
import { Link } from 'react-router-dom';

import '../App.scss';

export default function Main() {
  return (
    <div className="main">
      <Link className="main-link" to="/pictures">
        Start your mars expedition!
      </Link>
    </div>
  );
}
