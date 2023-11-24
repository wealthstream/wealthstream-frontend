import { Account } from './account.model';
export interface AccountMovement {
    idMvn?:              any;
    idAcc?:              Account;
    date?:               Date;
    movementType?:       string;
    value?:              number;
    balance?:            number;
}