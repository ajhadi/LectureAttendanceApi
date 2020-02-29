import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';

export interface ClassAttributes {
    id?: string;
    name: string;
    removalFlag?: boolean;
};

export interface ClassInstance extends Sequelize.Instance<ClassAttributes>, ClassAttributes {
};

export const ClassFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ClassInstance, ClassAttributes> => {
    const attributes: SequelizeAttributes<ClassAttributes> = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4()
        },
        name: {
            type: DataTypes.STRING,

        },
        removalFlag: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    };

    const Classes = sequelize.define<ClassInstance, ClassAttributes>('classes', attributes);

    Classes.associate = models => {
        Classes.belongsToMany(models.Users, {
            through: models.UserClasses
        });
    };

    return Classes;
};