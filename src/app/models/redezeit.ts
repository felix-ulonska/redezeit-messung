import { RedezeitType } from '../_enums/redezeit-type.enum';
import { RedezeitSpeaker } from './redezeit-type';

export interface Redezeit {
  duration: number;
  speaker: RedezeitSpeaker;
  type: RedezeitType;
  date: Date;
  id: string;
}
