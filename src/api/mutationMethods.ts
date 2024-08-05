import { API_ROUTES } from "@/constants/apiRoutes";
import { db } from "@/services/firebase/firebaseConfig";
import { EventDetails } from "@/types/compoundTypes";
import { SubmitTicketRequest } from "@/types/payload/addEventPayload";
import { addDoc, collection } from "firebase/firestore";

export const submitTicketRequest = async (payload: SubmitTicketRequest): Promise<void> => {
    try {
        const docRef = await addDoc(collection(db, API_ROUTES.TICKET_REQUEST), payload);
        console.log("Event successfully added with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
};