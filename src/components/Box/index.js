import React from 'react';
import './styles.scss';

export default function Box({ message }) {

  return (
    <div style={{ margin: '2rem auto' }}>
      <div className="box">
        <p>
          {message}
        </p>
      </div>
    </div>
  );
}
