import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';

export interface AttendanceAttributes {
    id?: string;
    isAbsent?: boolean;
    userId:string;
};

export interface AttendanceInstance extends Sequelize.Instance<AttendanceAttributes>, AttendanceAttributes {
};

export const AttendanceFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<AttendanceInstance, AttendanceAttributes> => {
    const attributes: SequelizeAttributes<AttendanceAttributes> = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4()
        },
        isAbsent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        userId:{
            type: DataTypes.STRING
        }
    };

    const Attendances = sequelize.define<AttendanceInstance, AttendanceAttributes>('attendances', attributes);

    Attendances.associate = models => {
        Attendances.belongsTo(models.ClassSections, { as: 'classSection', foreignKey: 'classSectionId' });
    };

    return Attendances;
};