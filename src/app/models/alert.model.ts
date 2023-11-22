import { AlertTypeEnum, TitleEnum } from './alert-type-enum';

export interface Alert {
    title: TitleEnum,
    message: string,
    message1?: string,
    message2?: string,
    type: AlertTypeEnum,
}
