import { Response } from "../basicTypes";

export interface SubmitTicketRequest {
    userId: string;
    responses: Response[];
    event: string;
    ticketStatus: string;


}