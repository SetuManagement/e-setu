import { Users } from "../models/users";
import { UserService } from "../services/userService";
import CrudController from "./crudController";

export class UsersController extends CrudController<Users> {
    constructor(services: UserService) {
        super(services);
    }
}