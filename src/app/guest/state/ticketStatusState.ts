import { getAllQuestions, getTicketStatusByUserAndEventId } from "@/api/queryMethods";
import { atom, selectorFamily } from "recoil";

export const questionsState = atom({
    key: "questionsState",
    default: [],
});
export const currentTicketStatus = atom({
    key: "currentTicketStatus",
    default: null,
});

export const ticketStatusQuery = selectorFamily({
    key: 'ticketStatus',
    get: ({ userId, eventId }: { userId: string; eventId: string }) => async ({ get }) => {
        const response = await getTicketStatusByUserAndEventId(userId, eventId)
        return response

    },
});