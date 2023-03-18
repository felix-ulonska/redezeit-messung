import { RedezeitType } from './redezeit-type';

export interface Redezeit {
  duration: number;
  type: RedezeitType;
  date: Date;
}
