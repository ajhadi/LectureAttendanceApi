import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import UserService from './user.service';
import CreateUserDto from './dtos/CreateUser.dto';
import validationMiddleware from '../../middlewares/validation.middleware';


class UserController implements Controller {
    public path = '/user';
    public router = Router();
    userService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = () => {
        this.router.get(`${this.path}/:username`, this.getUserDetail.bind(this));
        this.router.post(`${this.path}/student`, validationMiddleware(CreateUserDto), this.createStudent.bind(this));
        this.router.post(`${this.path}/teacher`, validationMiddleware(CreateUserDto), this.createTeacher.bind(this));
    }

    private async createStudent(request: Request, response: Response, next: NextFunction) {
        let userRequest: CreateUserDto  = request.body
        try {
            await this.userService.createStudentUser(userRequest)
            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }

    private async createTeacher(request: Request, response: Response, next: NextFunction) {
        let userRequest: CreateUserDto  = request.body
        try {
            await this.userService.createTeacherUser(userRequest)
            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }

    private async getUserDetail(request: Request, response: Response, next: NextFunction) {
        let {username}  = request.params
        try {
            let user = await this.userService.getUserDetail(username)
            response.status(200).json(user)
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;