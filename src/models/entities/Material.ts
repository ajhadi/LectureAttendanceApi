import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';

export interface MaterialAttributes {
    id?: string;
    name: String;
    description?: string;
    urlFile?: string;
    author?: string;
    classSectionId?: string;
};

export interface MaterialInstance extends Sequelize.Instance<MaterialAttributes>, MaterialAttributes {
};

export const MaterialFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<MaterialInstance, MaterialAttributes> => {
    const attributes: SequelizeAttributes<MaterialAttributes> = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4()
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        urlFile: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        classSectionId: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    };

    const Materials = sequelize.define<MaterialInstance, MaterialAttributes>('materials', attributes);
    return Materials;
};