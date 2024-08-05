import { collection, getDocs, getDoc, doc, where, query } from "firebase/firestore";
import { db } from "@/services/firebase/firebaseConfig";
import { API_ROUTES } from "@/constants/apiRoutes";
import { GetAllEventsResponse } from "@/types/response/getAllEventsResponse";
import { EventDetails, Questions, TicketDetails } from "@/types/compoundTypes";

export const getAllEvents = async (): Promise<GetAllEventsResponse> => {
    try {
        const querySnapshot = await getDocs(collection(db, API_ROUTES.EVENT));
        const events: GetAllEventsResponse = [];

        querySnapshot.forEach((doc) => {
            events.push({ id: doc.id, ...doc.data() } as EventDetails);
        });

        return events;
    } catch (error) {
        console.error("Error getting events:", error);
        throw error;
    }
};
export const getAllQuestions = async (eventId: string): Promise<Questions[]> => {
    try {
        const querySnapshot = await getDocs(
            query(collection(db, API_ROUTES.QUESTIONS), where("event", "==", eventId))
        );
        const questions: Questions[] = [];

        querySnapshot.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() } as Questions);
        });

        return questions;
    } catch (error) {
        console.error("Error getting questions:", error);
        throw error;
    }
};

export const getEventById = async (id: string): Promise<EventDetails | null> => {
    try {
        const docRef = doc(db, API_ROUTES.EVENT, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(`${docSnap.id} => ${docSnap.data()}`);
            return { id: docSnap.id, ...docSnap.data() } as EventDetails;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw error;
    }
};
export const getTicketStatusByUserAndEventId = async (userId: string, eventId: string): Promise<TicketDetails | null> => {
    try {
        console.log(userId, eventId)
        const q = query(
            collection(db, API_ROUTES.TICKET_REQUEST),
            where("userId", "==", userId),
            where("event", "==", eventId),
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return null;
        }

        const doc = querySnapshot.docs[0];
        const ticket = { id: doc.id, ...doc.data() } as TicketDetails;
        console.log("Previous Ticket details ", ticket)
        return ticket;
    } catch (error) {
        console.error("Error getting ticket status:", error);
        throw error;
    }
};