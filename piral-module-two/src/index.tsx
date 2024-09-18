import * as React from 'react';
import type { PiletApi } from 'test-app';

export function setup(app: PiletApi) {

  app.registerExtension('module-one-ext', () => <span style={{color: 'green'}}>content customised by another module</span>)
}
