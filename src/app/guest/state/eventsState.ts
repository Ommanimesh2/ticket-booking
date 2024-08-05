import { getAllEvents } from "@/api/queryMethods";
import { EventDetails } from "@/types/compoundTypes";
import { atom, selector } from "recoil";

export const eventsState = atom<EventDetails[]>({
    key: "eventsState",
    default: [],
});

export const eventsQuery = selector<EventDetails[]>({
    key: "events",
    get: async ({ get }) => {
        const response = await getAllEvents();
        return response;
    },
});