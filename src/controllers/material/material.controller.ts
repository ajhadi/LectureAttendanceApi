import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import MaterialService from './material.service';
import multer from 'multer';

class MaterialController implements Controller {
    public path = '/material';
    public router = Router();
    materialService = new MaterialService();

    constructor() {
        this.initializeRoutes();
    }

    private storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    })

    private upload = multer({ storage: this.storage, limits:{
        fileSize: 1024 * 1024 * 10 
    } })

    public initializeRoutes = () => {
        this.router.post(`${this.path}/upload`, this.upload.single('file'), this.uploadMaterial.bind(this));
        this.router.get(`${this.path}/:classSectionId`, this.getListMaterial.bind(this));
    }

    private async uploadMaterial(request: Request, response: Response, next: NextFunction) {
        let {name, description, author, classSectionId} = request.body
        try {
            await this.materialService.postMaterial(name, description, request.file, author, classSectionId)
            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }

    private async getListMaterial(request: Request, response: Response, next: NextFunction) {
        const {classSectionId} = request.params
        try {
            let materials = await this.materialService.getMaterialsBySections(classSectionId)
            response.status(200).json(materials)
        } catch (error) {
            next(error);
        }
    }
}

export default MaterialController;