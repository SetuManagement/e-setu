import express from 'express';

export class CRUDRoutes {
    getGenericRoutes = async (controller: any) => {
        const router = express.Router();
        // Create
        router.post('/', controller.create);
        // Read all
        router.get('/', controller.readAll);
        // Read by id
        router.get('/:id', controller.read);
        // Update by id
        router.put('/:id', controller.update);
        // Delete by id
        router.delete('/:id', controller.delete);

        return router;
    }
}