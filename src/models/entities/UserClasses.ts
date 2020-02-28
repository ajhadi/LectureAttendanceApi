import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';

export interface UserClassAttributes {
};

export interface UserClassInstance extends Sequelize.Instance<UserClassAttributes>, UserClassAttributes {
};

export const UserClassFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserClassInstance, UserClassAttributes> => {
  const attributes: SequelizeAttributes<UserClassAttributes> = {
    
  };

  const UserClasses = sequelize.define<UserClassInstance, UserClassAttributes>('user_classes', attributes, { timestamps: false});

  return UserClasses;
};