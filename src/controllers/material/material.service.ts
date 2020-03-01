import { DB } from '../../utils/config';
import { DbInterface } from '../../typings/DbInterface';
import { createModels } from '../../models';
import HttpException from '../../exceptions/HttpException';
import { AppError } from '../../contants/appError';

class MaterialService {
    db: DbInterface;

    constructor() {
        this.db = createModels(DB);
    }

    public async postMaterial(name: string, description: string, file: any, author: string, classSectionId: string) {
        await this.db.Materials.create({
            name: name,
            description: description,
            urlFile: file.path,
            author: author,
            classSectionId: classSectionId
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }

    public async getMaterialsBySections(classSectionId: string) {
        return await this.db.Materials.findAll({
            where: {
                classSectionId: classSectionId
            }
        }).catch((error) => {
            throw new HttpException(AppError.DefaultErrorMessage).AddDeveloperMessage(error);
        })
    }
}

export default MaterialService;