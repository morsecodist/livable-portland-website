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
        const calls = await client.incrBy(this.dateKey, 2);
        client.expire(this.dateKey, (60 * 60 * 24));
        if (calls > 9000) throw new Error("Too close to API limit")
        const _params = new URLSearchParams({
            key : process.env.BUSTIME_KEY, 
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
        const [metroPredictions, southPortlandPredictions] = await Promise.all([
            this.request("getpredictions", { stpid: stopId, rtpidatafeed: "Metro" }),
            this.request("getpredictions", { stpid: stopId, rtpidatafeed: "South Portland" }),
        ]);

        let predictions;
        if (metroPredictions.prd && southPortlandPredictions.prd) {
            metroPredictions.prd = metroPredictions.prd.concat(southPortlandPredictions.prd);
            metroPredictions.prd = metroPredictions.prd.sort((a, b) => {
                if (a.prdtm === b.prdtm) return 0;
                return a.prdtm < b.prdtm ? -1 : 1;
            });
            predictions = metroPredictions;
        } else if (metroPredictions.prd && southPortlandPredictions.error && southPortlandPredictions.error[0].msg === "No data found for parameter") {
            predictions = metroPredictions;
        } else if (southPortlandPredictions.prd && metroPredictions.error && metroPredictions.error[0].msg === "No data found for parameter") {
            predictions = southPortlandPredictions;
        } else if (metroPredictions.error) {
            predictions = metroPredictions;
        } else {
            predictions = southPortlandPredictions;
        }

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