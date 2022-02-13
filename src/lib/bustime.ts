class BusTime {
    private calls: number = 0;
    private predictionsCache: { [k: string]: [number, any] } = {};
    private bulletinsCache: { [k: string]: [number, any] } = {};

    private async request(path: string, params: { [key: string]: string }) {
        if (this.calls > 2000) {
            throw new Error("Too close to API limit")
        }
        const _params = new URLSearchParams({
            key : process.env.KEY, 
            rtpidatafeed : "Metro",
            format: "json",
        });
        Object.entries(params).forEach(([k, v]) => _params.append(k, v));
        this.calls++;
        const res = await fetch(`http://bustimeweb.smttracker.com/bustime/api/v3/${path}?${_params.toString()}`);
        return (await res.json())["bustime-response"];
    }

    predictions(stopId: string) {
        console.log(stopId);
        const cached = this.predictionsCache[stopId];
        if (cached && Date.now() - cached[0] < 60 * 1000) return cached[1];
        const predictions = this.request("getpredictions", { stpid: stopId });
        this.predictionsCache[stopId] = [Date.now(), predictions];
        return predictions;
    }

    serviceBulletins(stopId: string) {
        const cached = this.bulletinsCache[stopId];
        if (cached && Date.now() - cached[0] < 60 * 1000)return cached[1];
        const predictions = this.request("getservicebulletins", { stpid: stopId });
        this.bulletinsCache[stopId] = [Date.now(), predictions];
        return predictions;
    }
}

export default new BusTime();