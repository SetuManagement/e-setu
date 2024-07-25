import { MongoClient, Db } from 'mongodb';
import { MONGO_URI, DB_NAME } from './config';

class DBUtils {
    private client: MongoClient;
    private db: Db;

    constructor() {
        this.client = new MongoClient(MONGO_URI);
    }

    async connect(): Promise<void> {
        if (!this.db) {
            await this.client.connect();
            console.log('Connected successfully to server');
            this.db = this.client.db(DB_NAME);
        }
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
            console.log('Disconnected successfully from server');
            this.db = undefined;
        }
    }

    async getDb(): Promise<Db> {
        await this.connect();
        if (!this.db) {
            throw new Error('Database connection not established.');
        }
        return this.db;
    }
}

export default DBUtils;
