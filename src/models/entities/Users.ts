import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../typings/SequelizeAttributes';
import { RoleInstance, RoleAttributes } from './Roles';

export interface UserAttributes {
  id?: string;
  fullName: string;
  dateOfBirth?: Date|null;
  address?: string|null;
  username: string;
  email: string;
  passwordHash: string;
  phoneNumber?: string;
  removalFlag?: boolean;
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  getRoles: Sequelize.HasManyGetAssociationsMixin<RoleInstance>;
  setRoles: Sequelize.HasManySetAssociationsMixin<RoleInstance, RoleInstance['id']>;
  addRoles: Sequelize.HasManyAddAssociationsMixin<RoleInstance, RoleInstance['id']>;
  addRole: Sequelize.HasManyAddAssociationMixin<RoleInstance, RoleInstance['id']>;
  createRole: Sequelize.HasManyCreateAssociationMixin<RoleAttributes, RoleInstance>;
  removeRole: Sequelize.HasManyRemoveAssociationMixin<RoleInstance, RoleInstance['id']>;
  removeRoles: Sequelize.HasManyRemoveAssociationsMixin<RoleInstance, RoleInstance['id']>;
  hasRole: Sequelize.HasManyHasAssociationMixin<RoleInstance, RoleInstance['id']>;
  hasRoles: Sequelize.HasManyHasAssociationsMixin<RoleInstance, RoleInstance['id']>;
  countRoles: Sequelize.HasManyCountAssociationsMixin;
};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4()
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    passwordHash: {
      type: DataTypes.STRING
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        not: ['[a-z]', 'i']
      }
    },
    removalFlag:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  };

  const Users = sequelize.define<UserInstance, UserAttributes>('users', attributes, {
    defaultScope: {
      attributes: { exclude: ['removalFlag', 'createdAt', 'updatedAt'] }
    },
    scopes: {
      hidePassword:{
        attributes: { exclude: ['passwordHash'] }
      }
    }
  });

  Users.associate = models => {
    Users.belongsToMany(models.Roles, {
      through: models.UserRoles
    });
    Users.belongsToMany(models.Classes, {
      through: models.UserClasses
    });
  };

  return Users;
};