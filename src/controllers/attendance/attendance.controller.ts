import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import AttendanceService from './attendance.service';


class AttendanceController implements Controller {
    public path = '/attendance';
    public router = Router();
    AttendanceService = new AttendanceService();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = () => {
        this.router.post(`${this.path}/`, this.login.bind(this));
    }

    /**
     * @access     public
     * @param   {string} 
     * @return {object}
     */
    private async login(request: Request, response: Response, next: NextFunction) {
    }
}

export default AttendanceController;