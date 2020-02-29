import { DB } from '../../utils/config';
import { DbInterface } from '../../typings/DbInterface';
import { createModels } from '../../models';
import HttpException from '../../exceptions/HttpException';
import { AppError } from '../../contants/appError';
import UserService from '../user/user.service';
import ClassService from '../class/class.service';

class AttendanceService {
    db: DbInterface;
    userService= new UserService();
    classService = new ClassService();

    constructor() {
        this.db = createModels(DB);
    }

    public async postPresent(req: any) {
        if (!await this.userService.isStudentExist(req.userId)) { throw new HttpException(AppError.StudentNotFound) }
        if (!await this.classService.isClassSectionExist(req.classId)) { throw new HttpException(AppError.ClassNotExist) }

        let classSection = await this.db.ClassSections.findById(req.classId)

        let attendance = await this.db.Attendances.create({
            isAbsent:false,
            userId: req.userId
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })

        classSection?.addAttendance(attendance.id).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }

    public async postAbsent(req: any) {
        if (!await this.userService.isStudentExist(req.userId)) { throw new HttpException(AppError.StudentNotFound) }
        if (!await this.classService.isClassSectionExist(req.classId)) { throw new HttpException(AppError.ClassNotExist) }

        let classSection = await this.db.ClassSections.findById(req.classId)

        let attendance = await this.db.Attendances.create({
            isAbsent:true,
            userId: req.userId
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })

        classSection?.addAttendance(attendance.id).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }
}

export default AttendanceService;