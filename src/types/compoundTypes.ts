import { DateTime, Invitations, LocationObject, Price, Tickets } from "./basicTypes";

export interface TimeStamp {
    endDateTime: DateTime;
    startDateTime: DateTime;
}

export interface EventDetails {
    id: string;
    createdAt: DateTime;
    image: string;
    updatedAt: DateTime;
    description: string;
    price: Price;
    host: string;
    icon: string;
    invitaions: Invitations;
    location: LocationObject;
    tickets: Tickets;
    timeStamp: TimeStamp;
    title: string;
}

export interface Questions {
    id: string;
    event: string;
    type: string;
    questions: string;
    options?: any
}
export interface TicketDetails {
    id: string;
    event: string;
    userId: string;
    ticketStatus: string;
    responses?: any
} 
