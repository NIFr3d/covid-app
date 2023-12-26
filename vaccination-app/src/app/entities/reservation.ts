import { User } from "./user";

export interface Reservation {
    id: string,
    date: Date,
    centreId: string,
    done: boolean,
    userNom: string,
    userPrenom: string,
    userEmail: string,
}