import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import AuthenticationService from './authentication.service';


class AuthenticationController implements Controller {
    public path = '/auth';
    public router = Router();
    authenticationService = new AuthenticationService();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = () => {
        this.router.post(`${this.path}/login`, this.login.bind(this));
    }

    /**
     * @access     public
     * @param   {string} req.body.userId
     * @return {object} Object Token
     */
    private async login(request: Request, response: Response, next: NextFunction) {
        try {
            let user = await this.authenticationService.getUserDetail('7155aec5-5b4f-4f59-9189-8ab5bbb33dfc')
            response.status(200).json(user)
        } catch (error) {
            next(error);
        }
    }
}

export default AuthenticationController;