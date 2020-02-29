import App from './app';
import AuthenticationController from './controllers/authentication/authentication.controller';
import UserController from './controllers/user/user.controller';
import ClassController from './controllers/class/class.controller';

const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
    new ClassController()
  ],
);

app.listen();
