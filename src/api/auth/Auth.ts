import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';
import { redirectUri } from '../../metadata/Endpoints';

const config: OktaAuthOptions = {
    clientId: '0oadiqq80wq0ddBEq2p7',
    redirectUri: `${redirectUri}/login/callback`,
    issuer: 'https://metraweather.okta.com/oauth2/default',
};

var authClient: OktaAuth = new OktaAuth(config);

export default authClient;
