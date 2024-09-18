import * as React from 'react';

export default ({ExtensionComponent}) => {
  return (
    <>
      <h1>New Javascript API</h1>
      <p>
        Javascript components that can have <ExtensionComponent name="module-one-ext" empty={() => <span style={{color:"blue"}}> clear extension points</span>}/>.
      </p>
      <p>
        Each Javascript component can be built separately but share core dependencies (eg React) without complex webpack.config files
      </p>
      <p>
        Component will have a clear API for interacting with the CMS
      </p>
    </>
  );
};
