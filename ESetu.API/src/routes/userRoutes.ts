import { UsersController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { CRUDRoutes } from './crudRoutes';

export class UserRoutes extends CRUDRoutes {

    initializeUserRoutes = async () => {
        const service = new UserService("users");
        const controller = new UsersController(service);

        const router = await new CRUDRoutes().getGenericRoutes(controller);

        return router;
    }
}