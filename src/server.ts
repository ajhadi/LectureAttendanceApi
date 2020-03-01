import App from './app';
import UserController from './controllers/user/user.controller';
import ClassController from './controllers/class/class.controller';
import ScheduleController from './controllers/schedule/schedule.controller';
import AttendanceController from './controllers/attendance/attendance.controller';
import MaterialController from './controllers/material/material.controller';

const app = new App(
  [
    new UserController(),
    new ClassController(),
    new ScheduleController(),
    new AttendanceController(),
    new MaterialController()
  ],
);

app.listen();
