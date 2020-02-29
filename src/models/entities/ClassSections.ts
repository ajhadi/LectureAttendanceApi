import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';
import { AttendanceInstance, AttendanceAttributes } from './Attendances';

export interface ClassSectionAttributes {
  id?: string;
  classStartTime: Date|string;
  classEndTime: Date|string;
  classId: string;
  teacherId: string;
};

export interface ClassSectionInstance extends Sequelize.Instance<ClassSectionAttributes>, ClassSectionAttributes {
  getAttendances: Sequelize.HasManyGetAssociationsMixin<AttendanceInstance>;
  setAttendances: Sequelize.HasManySetAssociationsMixin<AttendanceInstance, AttendanceInstance['id']>;
  addAttendances: Sequelize.HasManyAddAssociationsMixin<AttendanceInstance, AttendanceInstance['id']>;
  addAttendance: Sequelize.HasManyAddAssociationMixin<AttendanceInstance, AttendanceInstance['id']>;
  createAttendance: Sequelize.HasManyCreateAssociationMixin<AttendanceAttributes, AttendanceInstance>;
  removeAttendance: Sequelize.HasManyRemoveAssociationMixin<AttendanceInstance, AttendanceInstance['id']>;
  removeAttendances: Sequelize.HasManyRemoveAssociationsMixin<AttendanceInstance, AttendanceInstance['id']>;
  hasAttendance: Sequelize.HasManyHasAssociationMixin<AttendanceInstance, AttendanceInstance['id']>;
  hasAttendances: Sequelize.HasManyHasAssociationsMixin<AttendanceInstance, AttendanceInstance['id']>;
  countAttendances: Sequelize.HasManyCountAssociationsMixin;
};

export const ClassSectionFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ClassSectionInstance, ClassSectionAttributes> => {
  const attributes: SequelizeAttributes<ClassSectionAttributes> = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4()
    },
    classStartTime: {
      type: DataTypes.DATE
    },
    classEndTime: {
        type: DataTypes.DATE
    },
    teacherId: {
        type: DataTypes.STRING
    },
    classId: {
        type: DataTypes.STRING
    }
  };

  const ClassSections = sequelize.define<ClassSectionInstance, ClassSectionAttributes>('class_sections', attributes);

  ClassSections.associate = models => {
    ClassSections.hasMany(models.Attendances, { as: 'attendances' });
  };

  return ClassSections;
};