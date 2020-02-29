import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import ClassService from './class.service';
import CreateClassDto from './dtos/createClass.dto';
import validationMiddleware from '../../middlewares/validation.middleware';
import AddSectionDto from './dtos/addSection.dto';


class ClassController implements Controller {
    public path = '/class';
    public router = Router();
    classService = new ClassService();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = () => {
        this.router.get(`${this.path}/`, validationMiddleware(CreateClassDto), this.createClass.bind(this));
        this.router.post(`${this.path}/`, validationMiddleware(CreateClassDto), this.createClass.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteClass.bind(this));
        this.router.post(`${this.path}/section`, validationMiddleware(AddSectionDto), this.addSection.bind(this));
        this.router.post(`${this.path}/:classId/:userId`, this.regisClass.bind(this));
    }

    private async createClass(request: Request, response: Response, next: NextFunction) {
        let newClass : CreateClassDto = request.body
        try {
            await this.classService.createNewClass(newClass.name)
            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }

    private async deleteClass(request: Request, response: Response, next: NextFunction) {
        let { id } = request.params
        try {
            await this.classService.deleteClass(id)
            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }

    private async addSection(request: Request, response: Response, next: NextFunction) {
        let sectionRequest : AddSectionDto = request.body
        try {
            await this.classService.addNewSection(sectionRequest)
            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }

    private async regisClass(request: Request, response: Response, next: NextFunction) {
        let { userId, classId } = request.params
        try {
            await this.classService.regisUserToClass(classId, userId)
            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }
}

export default ClassController;