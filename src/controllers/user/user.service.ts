import { DB } from '../../utils/config';
import { DbInterface } from '../../typings/DbInterface';
import { createModels } from '../../models';
import HttpException from '../../exceptions/HttpException';
import { AppError } from '../../contants/appError';
import { randomPassword } from '../../helper/stringGenerator';

class UserService {
    db: DbInterface;

    constructor() {
        this.db = createModels(DB);
    }

    public async getUserDetail(id: string) {
        let user = await this.db.Users.findOne({
            where: {
                id: id,
                removalFlag: false
            },
            include: [{
                model: this.db.Roles
            }]
        }).then(async (user) => {
            return user;
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        });
        return user;
    }

    public async createStudentUser(user: CreateStudentDto) {

        const role = await this.db.Roles.findOrCreate({
            where: { name: 'Student' },
            defaults: {
                name: 'Student',
              description: 'for attendance sign'
            }})

        await this.db.Users.create({
            fullName: user.fullName,
            dateOfBirth: user.dataOfBirth,
            username: user.username,
            email: user.email,
            passwordHash: randomPassword(),
            phoneNumber: user.phoneNumber
        }).then(async (user) => {
            //set user role student
            user.addRoles([role[0].id]).catch((error) => {
                throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
            })
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }

}

export default UserService;