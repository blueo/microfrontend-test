import * as React from 'react';
import { Link } from 'react-router-dom';
import type { PiletApi } from 'test-app';

const Page = React.lazy(() => import('./Page'));

export function setup(app: PiletApi) {
  app.registerPage('/admin/microadmin/', () => <Page ExtensionComponent={app.Extension}/>);

  app.registerMenu(() => <Link to="/admin/microadmin/">Module one</Link>);

}
