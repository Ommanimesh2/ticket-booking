import { getAllQuestions } from '@/api/queryMethods';
import { Questions } from '@/types/compoundTypes';
import { atom, selectorFamily } from 'recoil';

export const answersState = atom<string[]>({
    key: 'answersState',
    default: [],
});

export const currentUserIDState = atom<string>({
    key: 'currentUserIDState',
    default: '',
});

export const questionsState = atom<Questions[]>({
    key: 'questionsState',
    default: [],
});

export const questionsQuery = selectorFamily<Questions[], string>({
    key: 'questions',
    get: (eventId: string) => async () => {
        const response = await getAllQuestions(eventId);
        return response;
    },
});
