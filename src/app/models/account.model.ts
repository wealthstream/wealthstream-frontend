import { Customer } from "./customer.model";

export interface Account {
    idAcc?:                  any;
    idCus?:                  Customer
    accountNumber?:          string;
    accountType?:            string;
    initialBalance?:         number;
    state?:                  boolean
}