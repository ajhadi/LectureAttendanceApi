import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';

export interface UserRoleAttributes {
};

export interface UserRoleInstance extends Sequelize.Instance<UserRoleAttributes>, UserRoleAttributes {
};

export const UserRoleFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserRoleInstance, UserRoleAttributes> => {
  const attributes: SequelizeAttributes<UserRoleAttributes> = {
    
  };

  const UserRoles = sequelize.define<UserRoleInstance, UserRoleAttributes>('user_roles', attributes, { timestamps: false});

  return UserRoles;
};