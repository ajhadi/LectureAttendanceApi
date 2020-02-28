import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import UserService from './user.service';


class UserController implements Controller {
    public path = '/user';
    public router = Router();
    userService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = () => {
        this.router.post(`${this.path}/student`, this.createStudent.bind(this));
    }

    /**
     * @access      public
     * @param       {object} 
     * @return      {object} Object Token
     */
    private async createStudent(request: Request, response: Response, next: NextFunction) {
        let userRequest: CreateStudentDto  = request.body
        try {
            let newUser = await this.userService.createStudentUser(userRequest)
            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;