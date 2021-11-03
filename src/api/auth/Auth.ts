import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';

const config: OktaAuthOptions = {
    clientId: '0oaz90a79pSqxbUL70h7',
    redirectUri: window.location.origin,
    issuer: 'https://dev-metraweather.oktapreview.com/oauth2/default',
};

var authClient: OktaAuth = new OktaAuth(config);

export default authClient;
