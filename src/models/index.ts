import Sequelize from 'sequelize';
import { DbInterface } from '../typings/DbInterface';
import { UserFactory } from './entities/Users';
import { RoleFactory } from './entities/Roles';
import { UserRoleFactory} from './entities/UserRoles'
import { UserClassFactory } from './entities/UserClasses';
import { ClassFactory } from './entities/Classes';
import { ClassSectionFactory } from './entities/ClassSections';
import { AttendanceFactory } from './entities/Attendances';
import { MaterialFactory } from './entities/Material';

export const createModels = (sequelizeConfig: any): DbInterface => {
  // const { database, username, password, options } = sequelizeConfig;
  // const sequelize = new Sequelize(database, username, password, options);
  const dialect = process.env.DB_DIALECT;
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const dbname = process.env.DB_NAME;

  const sequelize = new Sequelize(`${dialect}://${user}:${pass}@${host}:${port}/${dbname}`);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Users: UserFactory(sequelize, Sequelize),
    Roles: RoleFactory(sequelize, Sequelize),
    Classes: ClassFactory(sequelize, Sequelize),
    UserRoles: UserRoleFactory(sequelize, Sequelize),
    UserClasses: UserClassFactory(sequelize, Sequelize),
    ClassSections: ClassSectionFactory(sequelize, Sequelize),
    Attendances: AttendanceFactory(sequelize, Sequelize),
    Materials: MaterialFactory(sequelize, Sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};