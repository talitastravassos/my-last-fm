import React from 'react';
import Input from './Input';

export default function Box({ message, disabled, setMessage }) {

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  return (
    <div style={{ margin: '2rem auto', width: '80%' }}>
      <Input
        name={'message'}
        value={message}
        onChange={handleChange}
        multiline={true}
        disabled={!disabled}
        label={'Tweet Message'}
      />
    </div>
  );
}
