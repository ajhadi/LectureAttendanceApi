import { DB } from '../../utils/config';
import { DbInterface } from '../../typings/DbInterface';
import { createModels } from '../../models';
import HttpException from '../../exceptions/HttpException';
import { AppError } from '../../contants/appError';
import { randomPassword } from '../../helper/stringGenerator';
import sequelize from 'sequelize';
import md5 from 'md5';

class UserService {
    db: DbInterface;

    constructor() {
        this.db = createModels(DB);
    }

    public async getUserDetail(username: string) {
        let user = await this.db.Users
            .scope({ attributes: { exclude: ['passwordHash', 'id', 'createdAt', 'updatedAt', 'removalFlag'] } })
            .findOne({
                where: {
                    username: username,
                    removalFlag: false
                },
                include: [{
                    model: this.db.Roles,
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'removalFlag'] }
                }]
            }).then(async (user) => {
                return user;
            }).catch((error) => {
                throw new HttpException(AppError.ValidationError).AddDeveloperMessage(error);
            });
        if (!user) {
            throw new HttpException(AppError.UserNotFound)
        }
        return user;
    }

    public async createStudentUser(user: CreateUserRequest) {

        const role = await this.db.Roles.findOrCreate({
            where: { name: 'Student' },
            defaults: {
                name: 'Student',
                description: 'For personal attendance sign.'
            }
        })

        if (!await this.isUserExist(user)) { throw new HttpException(AppError.ValidationError).AddDeveloperMessage('User exist.') }

        await this.db.Users.create({
            fullName: user.fullName,
            dateOfBirth: user.dateOfBirth,
            username: user.username,
            email: user.email,
            passwordHash: md5(user.password),
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

    public async createTeacherUser(user: CreateUserRequest) {

        const role = await this.db.Roles.findOrCreate({
            where: { name: 'Teacher' },
            defaults: {
                name: 'Teacher',
                description: 'For teacher.'
            }
        })

        if (await this.isUserExist(user)) { throw new HttpException(AppError.ValidationError).AddDeveloperMessage('User exist.') }

        await this.db.Users.create({
            fullName: user.fullName,
            dateOfBirth: user.dateOfBirth,
            username: user.username,
            email: user.email,
            passwordHash: md5(user.password),
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

    public async isUserExist(user: CreateUserRequest) {
        const userExist = await this.db.Users.findOne({
            where: sequelize.or(
                { username: user.username, removalFlag: false },
                { email: user.email, removalFlag: false }
            )
        })
        if (userExist == null) { return false }
        return true
    }

    public async isStudentExist(id: string) {
        const userExist = await this.db.Users.findOne({
            where: 
                { id: id, removalFlag: false }
        })
        if (userExist == null) { return false }
        return true
    }

    public async isTeacher(id: string) {
        const teacher: any = await this.db.Users.findAll({
            where: { id: id, removalFlag: false },
            include: [{
                model: this.db.Roles
            }]

        })
        if (teacher[0].roles.length > 0) {
            return true
        }
        return false
    }
}

export default UserService;