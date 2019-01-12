# streamlabs-ws-client

![Language](https://img.shields.io/badge/language-TypeScript-blue.svg)
![Node Version](https://img.shields.io/badge/node-v.10.15.0-blue.svg)
![Yarn Version](https://img.shields.io/badge/yarn-v1.12.3-yellow.svg)
![Licence Info](https://img.shields.io/badge/license-MIT-brightgreen.svg)

<a href="https://communityinviter.com/apps/koa-js/koajs" rel="KoaJs Slack Community">![Streamlabs Slack](https://img.shields.io/badge/streamlabs-slack%20channel-red.svg?style=for-the-badge&logo=appveyor)</a>

<a href="https://communityinviter.com/apps/koa-js/koajs" rel="KoaJs Slack Community">![Streamlabs Slack](https://img.shields.io/badge/streamlabs-discord%20channel-red.svg?style=for-the-badge&logo=appveyor)</a>

Unofficial Streamlabs WebSocket API Client

* 🎉 First class Typescript support
* 📡 Real-time via socket.io-client
* 👌 Simple un-opinionated API


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [Support](#support)
- [Contributing](#contributing)
- [Licence](#licence)
- [Author](#author)

## Installation

```bash
$ npm install --save streamlabs-ws-client

...
```
```bash
$ yarn add streamlabs-ws-client

...
```

## Usage

```js
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
```

## API

### `connect()`
```ts
client.connect();
```

### `disconnect()`
```ts
client.disconnect();
```

### `on()`
```ts
client.on("event", (data: IStreamlabsWSEventMessage) => {
    // Do something
});
```

### `emit()`
```ts
client.on("event", (data: IStreamlabsWSEventMessage) => {
    // TBC
});
```

## Examples

TBC

## Support

Please [open an issue](https://github.com/jarvisprestidge/streamlabs-ws-client/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/jarvisprestidge/streamlabs-ws-client/compare/).

## License

**MIT** : http://opensource.org/licenses/MIT

## Author

**Jarvis Prestidge** | <jarvisprestidge@gmail.com>
