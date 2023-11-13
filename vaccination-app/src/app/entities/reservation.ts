import { User } from "./user";

export interface Reservation {
    id: string,
    date: Date,
    centreId: string,
    user: User
}