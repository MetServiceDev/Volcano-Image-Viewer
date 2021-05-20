import authClient from './Auth.js';
import { redirectUri } from '../metadata/Endpoints';

const issueToken = () => {
    return authClient.token.getWithoutPrompt({
        responseType: ['id_token', 'token'],
        redirectUri: redirectUri,
      }).then(res => {
        const accessToken = res.tokens.accessToken.accessToken;
        return accessToken
      }).catch((err) =>  { throw err });
}

export default issueToken;