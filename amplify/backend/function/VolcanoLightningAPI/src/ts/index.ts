import { fetchLightningStrikes } from './lightningFormatter';

const handler = async() => {
    const output = await fetchLightningStrikes();
    return {
        statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(output),
    }
};

export { handler };
