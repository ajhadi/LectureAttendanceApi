import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import ScheduleService from './schedule.service';
import GetUserScheduleDto from './dtos/getUserSchedule.dto';


class ScheduleController implements Controller {
    public path = '/schedule';
    public router = Router();
    scheduleService = new ScheduleService();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = () => {
        this.router.get(`${this.path}/:classId`, this.getScheduleByClass.bind(this));
        // this.router.put(`${this.path}/:classSectionId`, this.getScheduleByClass.bind(this));
        // this.router.delete(`${this.path}/:classSectionId`, this.getScheduleByClass.bind(this));
    }

    private async getScheduleByClass(request: Request, response: Response, next: NextFunction) {
        let {classId} = request.params
        try {
            let schedule = await this.scheduleService.getScheduleByClass(classId)
            response.status(200).json(schedule)
        } catch (error) {
            next(error);
        }
    }

}

export default ScheduleController;