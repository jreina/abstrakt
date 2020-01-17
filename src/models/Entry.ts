import {Moment} from 'moment';

export type Entry = ReferenceEntry | TimeEntry | InstanceEntry;

export type ActivityEntry = TimeEntry | InstanceEntry;

export interface ReferenceEntry {
  id: string;
  title: string;
  tags?: Array<string>;
}

export interface TimeEntry {
  id: string;
  title: string;
  tags?: Array<string>;
  start: Moment;
  end?: Moment;
}
 
export interface InstanceEntry {
  id: string;
  title: string;
  tags?: Array<string>;
  time: Moment;
  data?:Array<string>;
}
