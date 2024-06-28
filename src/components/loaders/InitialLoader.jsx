import React from 'react';
import Logo from '../Logo'

function InitialLoader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-swivel">
        <Logo width="100px" />
      </div>
    </div>
  );
}

export default InitialLoader;
