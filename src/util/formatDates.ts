import { ActivityEntry } from "../models/Entry";
import moment from "moment";

export function formatDates(entry: ActivityEntry) {
    if('start' in entry) entry['start'] = moment(entry['start']);
    if('end' in entry) entry['end'] = moment(entry['end']);
    if('time' in entry) entry['time'] = moment(entry['time']);
    return entry;
}