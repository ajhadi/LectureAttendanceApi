import { Authentication, DB } from '../../utils/config';
import * as jwt from 'jsonwebtoken';
import { UserInstance } from '../../models/entities/Users';
import { DbInterface } from '../../typings/DbInterface';
import { createModels } from '../../models';
import HttpException from '../../exceptions/HttpException';
import { AppError } from '../../contants/appError';

class AuthenticationService {
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

    public async createStudentUser(user: UserInstance) {
        
    }

    public async addRoleToUser(userId: any, roleId: number) {
        await this.db.Users.findById(userId).then(async (user) => {
            let role = await this.db.Roles.findById(roleId).then(role => { return role })
            user?.addRoles([role?.id])
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }
}

export default AuthenticationService;