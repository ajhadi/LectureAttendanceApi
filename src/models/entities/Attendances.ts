import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';

export interface AttendanceAttributes {
    id?: string;
    isAbsent?: boolean;
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
        }
    };

    const Attendances = sequelize.define<AttendanceInstance, AttendanceAttributes>('attendances', attributes);

    Attendances.associate = models => {
        Attendances.belongsTo(models.ClassSections, { as: 'classSection', foreignKey: 'classSectionId' });
        Attendances.belongsTo(models.Users, { as: 'student', foreignKey: 'userId' });
    };

    return Attendances;
};