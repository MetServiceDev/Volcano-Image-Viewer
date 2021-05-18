import { redirectUri } from '../Endpoints';

test('Redirect URL', () => {
  expect(redirectUri).toBe('http://volcano-img-viewer.s3-website-ap-southeast-2.amazonaws.com/')
});
