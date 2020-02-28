import * as Sequelize from "sequelize";
import { UserInstance, UserAttributes } from "../../models/entities/Users";
import { RoleInstance, RoleAttributes} from '../../models/entities/Roles';
import { UserRoleInstance, UserRoleAttributes } from "../../models/entities/UserRoles";
import { UserClassInstance, UserClassAttributes } from "../../models/entities/UserClasses";
import { ClassInstance, ClassAttributes } from "../../models/entities/Classes";
import { ClassSectionAttributes, ClassSectionInstance } from "../../models/entities/ClassSections";
import { AttendanceAttributes, AttendanceInstance } from "../../models/entities/Attendances";
import { MaterialInstance, MaterialAttributes } from "../../models/entities/Material";

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Users: Sequelize.Model<UserInstance, UserAttributes>;
  Roles: Sequelize.Model<RoleInstance, RoleAttributes>;
  Classes: Sequelize.Model<ClassInstance, ClassAttributes>;
  UserRoles: Sequelize.Model<UserRoleInstance, UserRoleAttributes>;
  UserClasses: Sequelize.Model<UserClassInstance, UserClassAttributes>;
  ClassSections: Sequelize.Model<ClassSectionInstance, ClassSectionAttributes>;
  Attendances: Sequelize.Model<AttendanceInstance, AttendanceAttributes>;
  Materials: Sequelize.Model<MaterialInstance, MaterialAttributes>;
  
}