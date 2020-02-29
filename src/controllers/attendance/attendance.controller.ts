import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import AttendanceService from './attendance.service';
import UserPresentDto from './dtos/userPerest.dto';


class AttendanceController implements Controller {
    public path = '/attendance';
    public router = Router();
    AttendanceService = new AttendanceService();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = () => {
        this.router.post(`${this.path}/present`, this.userPresent.bind(this));
        this.router.post(`${this.path}/absent`, this.userAbsent.bind(this));
    }

    private async userPresent(request: Request, response: Response, next: NextFunction) {
        let req : UserPresentDto = request.body
        try {
            let schedule = await this.AttendanceService.postPresent(req)
            response.status(200).json(schedule)
        } catch (error) {
            next(error);
        }
    }

    private async userAbsent(request: Request, response: Response, next: NextFunction) {
        let req : UserPresentDto = request.body
        try {
            let schedule = await this.AttendanceService.postAbsent(req)
            response.status(200).json(schedule)
        } catch (error) {
            next(error);
        }
    }
}

export default AttendanceController;