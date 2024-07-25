import { Request, Response } from 'express';
import CRUDService from '../services/crudService';
import { OptionalUnlessRequiredId } from 'mongodb';

class CrudController<T> {
    private service: any;

    constructor(service: any) {
        this.service = service;

        this.create = this.create.bind(this);
        this.read = this.read.bind(this);
        this.readAll = this.readAll.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const item = req.body as OptionalUnlessRequiredId<T>; // Assuming request body directly matches T
            const newItem = await this.service.create(item);
            res.status(201).json(newItem);
        } catch (error) {
            console.error('Error creating item:', error);
            res.status(500).json({ error: 'Failed to create item' });
        }
    }

    async read(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const item = await this.service.read(id);
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            console.error('Error reading item:', error);
            res.status(500).json({ error: 'Failed to read item' });
        }
    }

    async readAll(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.service.readAll();
            res.status(200).json(items);
        } catch (error) {
            console.error('Error reading items:', error);
            res.status(500).json({ error: 'Failed to read items' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const updatedItem = req.body as Partial<T>;
            await this.service.update(id, updatedItem);
            res.status(204).end();
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).json({ error: 'Failed to update item' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.service.delete(id);
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting item:', error);
            res.status(500).json({ error: 'Failed to delete item' });
        }
    }
}

export default CrudController;
