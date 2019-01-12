const { StreamlabsClient } = require("../lib/index");

const debugEvents = [
    "connect",
    "connect_error",
    "connect_timeout",
    "disconnect",
    "error"
];

const streamlabsEvents = [
    "follow",
    "bits",
    "host",
    "raid",
    "merch",
    "subscription",
    "resubscription",
    "donation"
];

const token = "<INSERT STREAMLABS WS TOKEN>";

const client = new StreamlabsClient({
    token,
    emitTests: true,
    rawEvents: debugEvents
});

for (const debugEvent of debugEvents) {
    client.on(debugEvent, (data) => {
        console.debug(`[STREAMLABS-EVENT] Event: ${debugEvent}`, data);
    });
}

for (const streamEvent of streamlabsEvents) {
    client.on(streamEvent, async (data) => {
        console.info(`[STREAMLABS-EVENT] Event: ${streamEvent}`, JSON.stringify(data, null, 4));
    });
}

client.connect();