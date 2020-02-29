import { DB } from '../../utils/config';
import { DbInterface } from '../../typings/DbInterface';
import { createModels } from '../../models';
import HttpException from '../../exceptions/HttpException';
import { AppError } from '../../contants/appError';
import moment from 'moment';

class ScheduleService {
    db: DbInterface;

    constructor() {
        this.db = createModels(DB);
    }

    public async getScheduleByClass(classId: string) {
        const classExist = await this.db.ClassSections.findAll({
            where: { classId: classId} 
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
        if (classExist.length == 0 ) {
            throw new HttpException(AppError.DefaultErrorMessage)
        }
        console.log(Date.now())
        return classExist
    }
}

export default ScheduleService;