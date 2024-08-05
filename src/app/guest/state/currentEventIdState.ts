import { atom, selector } from "recoil";
import { eventsState } from "./eventsState";
import { EventDetails } from "@/types/compoundTypes";

export const currentEventIdState = atom<string | null>({
    key: "currentEventId",
    default: null,
});

export const currentEventSelector = selector<EventDetails | undefined>({
    key: "currentEvent",
    get: ({ get }) => {
        const events = get(eventsState);
        const currentEventId = get(currentEventIdState);
        const currentEvent = events.find((event) => event.id === currentEventId)
        return currentEvent;
    },
});
