import { Person } from "./person.model";

export interface Customer {
    idCus?:          any;
    person?:         Person;
    password?:       string;
    email?:          string;
    state?:          boolean
}