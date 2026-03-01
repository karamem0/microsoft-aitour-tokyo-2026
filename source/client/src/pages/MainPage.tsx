//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import React from 'react';

import Presenter from './MainPage.presenter';

import { InteractionStatus } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';
import { loginParams } from '../config/MsalConfig';

function MainPage() {

  const msal = useMsal();

  const [ loading, setLoading ] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      if (msal.inProgress !== InteractionStatus.None) {
        return;
      }
      if (msal.accounts.length > 0) {
        msal.instance.setActiveAccount(msal.accounts[0]);
        axios.interceptors.request.use(async (request) => {
          const authResult = await msal.instance.acquireTokenSilent(loginParams);
          const accessToken = authResult.accessToken;
          request.headers.Authorization = `Bearer ${accessToken}`;
          return request;
        });
        setLoading(false);
      } else {
        msal.instance.loginRedirect(loginParams);
      }
    })();
  }, [
    msal
  ]);

  return (
    <Presenter loading={loading} />
  );

}

export default MainPage;
