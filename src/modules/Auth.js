import { OktaAuth } from '@okta/okta-auth-js';
import { redirectUri } from '../metadata/Endpoints';

var authClient = new OktaAuth({
    url: 'https://dev-metraweather.oktapreview.com',
    clientId: '0oaz90a79pSqxbUL70h7',
    redirectUri: redirectUri,
    issuer: 'https://dev-metraweather.oktapreview.com/oauth2/default',
    tokenManager: {
        storage: 'localStorage',
        autoRenew: true
    }
});

export default authClient;