import { createClient, RedisClientType } from 'redis';

class BusTime {
    private client: Promise<RedisClientType<any, any>>

    constructor() {
        this.client = (async () => {
            const client = createClient({
                url: process.env.REDIS_URL,
                password: process.env.REDIS_PASSWORD,
            });
            client.on('error', (err) => console.error('Redis Client Error', err));
            await client.connect();
            return client;
          })()
    }

    private get dateKey() {
        return (new Date()).toISOString().substring(0, 10);
    }

    private async request(path: string, params: { [key: string]: string }) {
        const client = await this.client;
        const calls = await client.incr(this.dateKey);
        client.expire(this.dateKey, (60 * 60 * 24));
        if (calls > 9000) throw new Error("Too close to API limit")
        const _params = new URLSearchParams({
            key : process.env.BUSTIME_KEY, 
            rtpidatafeed : "Metro",
            format: "json",
        });
        Object.entries(params).forEach(([k, v]) => _params.append(k, v));
        const res = await fetch(`http://bustimeweb.smttracker.com/bustime/api/v3/${path}?${_params.toString()}`);
        return (await res.json())["bustime-response"];
    }

    async predictions(stopId: string) {
        const client = await this.client;
        const cached = await client.get(`predictions-${stopId}`);
        if (cached) return JSON.parse(cached);
        const predictions = await this.request("getpredictions", { stpid: stopId });
        await client.set(`predictions-${stopId}`, JSON.stringify(predictions), {EX: 30});
        return predictions;
    }

    async serviceBulletins(stopId: string) {
        const client = await this.client;
        const cached = await client.get(`bulletins-${stopId}`);
        if (cached) return JSON.parse(cached);
        const bulletins = await this.request("getservicebulletins", { stpid: stopId });
        await client.set(`bulletins-${stopId}`, JSON.stringify(bulletins), {EX: 60});
        return bulletins;
    }
}

export default new BusTime();