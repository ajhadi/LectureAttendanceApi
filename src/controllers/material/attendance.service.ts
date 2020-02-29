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

    public async postPresent(req: AttendanceRequest) {
        if (!await this.userService.isStudentExist(req.userId)) { throw new HttpException(AppError.StudentNotFound) }
        if (!await this.classService.isClassSectionExist(req.classSectionId)) { throw new HttpException(AppError.ClassNotExist) }
        if (await this.hasAttendanceSign(req)) {throw new HttpException(AppError.AttendanceHasSign)}
        
        let classSection = await this.db.ClassSections.findById(req.classSectionId)

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

    public async postAbsent(req: AttendanceRequest) {
        if (!await this.userService.isStudentExist(req.userId)) { throw new HttpException(AppError.StudentNotFound) }
        if (!await this.classService.isClassSectionExist(req.classSectionId)) { throw new HttpException(AppError.ClassNotExist) }
        if (await this.hasAttendanceSign(req)) {throw new HttpException(AppError.AttendanceHasSign)}

        let classSection = await this.db.ClassSections.findById(req.classSectionId)

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

    public async hasAttendanceSign(req: AttendanceRequest){
        let attendance = await this.db.Attendances.findOne({
            where: {
                userId: req.userId,
                classSectionId: req.classSectionId
            }
        })
        if (attendance == null) {
            return false
        }
        return true
    }
}

export default AttendanceService;