import bustime from "../../../../lib/bustime";

export async function get({ params }) {
    const { stop_id } = params;
    return {
        body: await bustime.predictions(stop_id),
    };
}