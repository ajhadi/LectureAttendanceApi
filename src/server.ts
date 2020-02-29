import App from './app';
import UserController from './controllers/user/user.controller';
import ClassController from './controllers/class/class.controller';
import ScheduleController from './controllers/schedule/schedule.controller';
import AttendanceController from './controllers/attendance/attendance.controller';

const app = new App(
  [
    new UserController(),
    new ClassController(),
    new ScheduleController(),
    new AttendanceController()
  ],
);

app.listen();
