import { TimeStamp } from "@/types/compoundTypes";
import { DateTime } from "@/types/basicTypes";


export const convertToJSDate = (dateTime: DateTime): Date => {
    return new Date(dateTime.seconds * 1000 + dateTime.nanoseconds / 1000000);
};

export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
};

export const formatTimeRange = (timeStamp: TimeStamp): string => {
    const startDate = convertToJSDate(timeStamp.startDateTime);
    const endDate = convertToJSDate(timeStamp.endDateTime);

    const formatTime = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return date.toLocaleTimeString('en-US', options);
    };

    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
};

