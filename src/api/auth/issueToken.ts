import authClient from './Auth';
import { redirectUri } from '../../metadata/Endpoints';

const issueToken = async (): Promise<string> => {
    try {
        const auth = await authClient.token.getWithoutPrompt({
            responseType: ['id_token', 'token'],
            redirectUri: `${redirectUri}/login/callback`,
          })
        const accessToken = auth?.tokens?.accessToken?.accessToken;
        return accessToken as string;
    } catch (err) {
        throw err;
    }
};

export default issueToken;
