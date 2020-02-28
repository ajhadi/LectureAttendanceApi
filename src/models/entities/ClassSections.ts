import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';

export interface ClassSectionAttributes {
  id?: string;
  classStartTime: Date;
  classEndTime: Date;
};

export interface ClassSectionInstance extends Sequelize.Instance<ClassSectionAttributes>, ClassSectionAttributes {
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
    }
  };

  const ClassSections = sequelize.define<ClassSectionInstance, ClassSectionAttributes>('class_sections', attributes);

  ClassSections.associate = models => {
    ClassSections.belongsTo(models.Classes, { as: 'class', foreignKey: 'classId' });
    ClassSections.belongsTo(models.Users, { as: 'teacher', foreignKey: 'teacherId' });
    ClassSections.hasMany(models.Attendances, { as: 'attendances' });
  };

  return ClassSections;
};