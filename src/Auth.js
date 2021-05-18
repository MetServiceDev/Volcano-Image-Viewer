import { OktaAuth } from '@okta/okta-auth-js';

var authClient = new OktaAuth({
    url: 'https://dev-metraweather.oktapreview.com',
    tokenManager: {
        storage: 'sessionStorage',
        autoRenew: true
    },
    clientId: '0oaz90a79pSqxbUL70h7',
    redirectUri: 'http://localhost:3000',
    issuer: 'https://dev-metraweather.oktapreview.com/oauth2/default' 
});

export default authClient;