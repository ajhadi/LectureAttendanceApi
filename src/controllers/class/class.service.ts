import { DB } from '../../utils/config';
import { DbInterface } from '../../typings/DbInterface';
import { createModels } from '../../models';
import HttpException from '../../exceptions/HttpException';
import { AppError } from '../../contants/appError';
import UserService from '../user/user.service';

class ClassService {
    db: DbInterface;
    userService = new UserService()

    constructor() {
        this.db = createModels(DB);
    }

    public async createNewClass(className: string) {
        const classExist = await this.db.Classes.findOne({ where: { name: className, removalFlag: false } })
        if (classExist !== null) { throw new HttpException(AppError.ClassIsExist) }

        await this.db.Classes.create({
            name: className
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }

    public async deleteClass(idClass: string) {
        if (!await this.isClassExist(idClass)) { throw new HttpException(AppError.ClassNotExist) }

        await this.db.Classes.update({ removalFlag: true }, {
            where: {
                id: idClass
            }
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }

    public async addNewSection(newSection: AddSectionRequest) {
        if (!await this.isClassExist(newSection.classId)) { throw new HttpException(AppError.ClassNotExist) }
        if (!await this.userService.isTeacher(newSection.teacherId)) { throw new HttpException(AppError.UserIsNotTeacher) }

        await this.db.ClassSections.create({
            classStartTime: `${newSection.date} ${newSection.startTime}`,
            classEndTime: `${newSection.date} ${newSection.endTime}`,
            classId: newSection.classId,
            teacherId:newSection.teacherId
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }

    public async regisUserToClass(classId: string, userId: string) {
        if (!await this.isClassExist(classId)) { throw new HttpException(AppError.ClassNotExist) }
        if (!await this.userService.isStudentExist(userId)) { throw new HttpException(AppError.StudentNotFound) }

        await this.db.UserClasses.create({
            userId: userId,
            classId: classId
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }

    private async isClassExist(id: string) {
        const classExist = await this.db.Classes.findOne({ where: { id: id, removalFlag: false } })
        if (classExist == null) { return false }
        return true
    }
}

export default ClassService;