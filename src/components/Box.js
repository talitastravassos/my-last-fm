import React from 'react';
import Input from './Input';

export default function Box({ message }) {
  return (
    <div style={{ margin: '2rem auto', width: '80%' }}>
      <Input
        name={'message'}
        value={message}
        onChange={(e) => console.log(e)}
        multiline={true}
        disabled={true}
        label={'Tweet Message'}
      />
    </div>
  );
}
