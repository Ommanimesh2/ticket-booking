export interface DateTime {
    nanoseconds: number;
    seconds: number;
}

export interface LocationObject {
    formattedAddress: string;
    latitude: string;
    longitude: string;
}

export interface Invitations {
    accepted: number;
    sent: number;
    waiting: number;
}

export interface Tickets {
    remaining: number;
    sold: number;
    total: number;
}

export interface Price {
    upperLimit: number;
    lowerLimit: number;
}
export interface Response {
    question: string;
    answer: any

}