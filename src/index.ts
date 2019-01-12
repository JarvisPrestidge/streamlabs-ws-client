// Client
export { default as StreamlabsClient } from "./streamlabs";

// Type guards
export { 
    isBits, 
    isDonation, 
    isFollow, 
    isSubscription, 
    isHost, 
    isRaid, 
    isMerch 
} from "./utils/guards";


// Interfaces
export {
    StreamlabsWSEventType,
    StreamlabsWSEventPlatform,
    StreamlabsWSEventMessage
} from "./interfaces/events/IStreamlabsWSEvent";

// Streamlabs response schema
export { IStreamlabsDonation } from "./interfaces/events/streamlabs/IStreamlabsDonation"

// Twitch response schema
export { ITwitchFollow } from "./interfaces/events/twitch/ITwitchFollow"
export { ITwitchBits } from "./interfaces/events/twitch/ITwitchBits"
export { ITwitchSub } from "./interfaces/events/twitch/ITwitchSub"
export { ITwitchSubGift } from "./interfaces/events/twitch/ITwitchSubGift"
export { ITwitchHost } from "./interfaces/events/twitch/ITwitchHost"
export { ITwitchRaid } from "./interfaces/events/twitch/ITwitchRaid"
export { ITwitchMerch } from "./interfaces/events/twitch/ITwitchMerch"
