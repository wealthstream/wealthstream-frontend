import { Customer } from "./customer.model";

export interface Account {
    idAcc:                  any;
    idCus:                  Customer
    accountNumber:          string;
    accountTypestring:      string;
    initialBalance:         string;
    state:                  boolean
}