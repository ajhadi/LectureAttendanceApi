import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';

export interface RoleAttributes {
  id?: number;
  name: string;
  description?: string;
  removalFlag?: boolean;
};

export interface RoleInstance extends Sequelize.Instance<RoleAttributes>, RoleAttributes {
};

export const RoleFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RoleInstance, RoleAttributes> => {
  const attributes: SequelizeAttributes<RoleAttributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    removalFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  };

  const Roles = sequelize.define<RoleInstance, RoleAttributes>('roles', attributes);

  Roles.associate = models => {
    Roles.belongsToMany(models.Users, {
      through: models.UserRoles,
      foreignKey: 'rolesId'
    });
  };

  return Roles;
};