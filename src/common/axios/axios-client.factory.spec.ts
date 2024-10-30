import AxiosClientFactory from './axios-client.factory';
import MockAdapter from 'axios-mock-adapter';

describe('AxiosClientFactory', () => {
    const axiosClient = AxiosClientFactory.create('https://api.com');
    const axiosClientMock = new MockAdapter(axiosClient);
    const endpoint = '/data';

    beforeEach(() => {
        axiosClientMock.reset();
    });

    describe('Axios Client', () => {
        it('should retry when there is a network error', async () => {
            axiosClientMock.onGet(endpoint).networkErrorOnce().onGet(endpoint).replyOnce(200);

            const res = await axiosClient.get(endpoint);
            expect(res.status).toBe(200);
            expect(axiosClientMock.history.get).toHaveLength(2);
        });

        it('should retry when there is a 5xx error', async () => {
            axiosClientMock.onGet(endpoint).replyOnce(500).onGet(endpoint).replyOnce(200);

            const res = await axiosClient.get(endpoint);
            expect(res.status).toBe(200);
            expect(axiosClientMock.history.get).toHaveLength(2);
        });

        it('should retry at most 3 times when there is an error', async () => {
            axiosClientMock.onGet(endpoint).networkErrorOnce().onGet(endpoint).reply(500);

            await expect(async () => await axiosClient.get(endpoint)).rejects.toThrow();
            expect(axiosClientMock.history.get).toHaveLength(3);
        });

        it('should NOT retry when there is a 4xx error', async () => {
            axiosClientMock.onGet(endpoint).replyOnce(400).onGet(endpoint).replyOnce(200);

            await expect(async () => await axiosClient.get(endpoint)).rejects.toThrow();
            expect(axiosClientMock.history.get).toHaveLength(1);
        });

        it('should NOT retry when operation is not idempotent', async () => {
            axiosClientMock.onPost(endpoint).replyOnce(500).onPost(endpoint).replyOnce(200);

            await expect(async () => await axiosClient.post(endpoint)).rejects.toThrow();
            expect(axiosClientMock.history.post).toHaveLength(1);
        });
    });
});
