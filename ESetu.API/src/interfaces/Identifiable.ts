import { ObjectId } from "mongodb";

export interface Identifiable {
    _id?: ObjectId;
}