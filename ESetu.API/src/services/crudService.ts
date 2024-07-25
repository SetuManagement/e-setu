import { Collection, ObjectId, OptionalUnlessRequiredId, WithId, Filter, DeleteResult } from 'mongodb';
import DBUtils from '../utils/dbUtils';
import { Identifiable } from '../interfaces/Identifiable';

class CRUDService<T extends Identifiable> {
    private dbUtils: DBUtils;
    private collection: Collection<T>;
    private collectionName: string;

    constructor(collectionName: string) {
        this.dbUtils = new DBUtils();
        this.collectionName = collectionName;
        this.connect();
    }

    async connect() {
        await this.dbUtils.connect();
        this.collection = (await this.dbUtils.getDb()).collection<T>(this.collectionName);
    }

    async disconnect() {
        await this.dbUtils.disconnect();
    }

    async create(item: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
        try {
            await this.connect();
            const result = await this.collection.insertOne(item);
            return { ...item, _id: result.insertedId } as WithId<T>;
        } catch (error) {
            throw new Error(`Failed to create item: ${error.message}`);
        }
    }

    async read(id: string): Promise<WithId<T> | null> {
        try {
            await this.connect();
            const filter: Filter<T> = { _id: new ObjectId(id) } as Filter<T>;
            return await this.collection.findOne(filter);
        } catch (error) {
            throw new Error(`Failed to read item: ${error.message}`);
        }
    }

    async readAll(): Promise<WithId<T>[]> {
        try {
            await this.connect();
            return await this.collection.find({}).toArray();
        } catch (error) {
            throw new Error(`Failed to read all items: ${error.message}`);
        }
    }

    async update(id: string, item: Partial<T>): Promise<void> {
        try {
            await this.connect();
            const filter: Filter<T> = { _id: new ObjectId(id) } as Filter<T>;
            await this.collection.updateOne(filter, { $set: item });
        } catch (error) {
            throw new Error(`Failed to update item: ${error.message}`);
        }
    }

    async delete(id: string): Promise<DeleteResult> {
        try {
            await this.connect();
            const filter: Filter<T> = { _id: new ObjectId(id) } as Filter<T>;
            return await this.collection.deleteOne(filter);
        } catch (error) {
            throw new Error(`Failed to delete item: ${error.message}`);
        }
    }
}

export default CRUDService;
