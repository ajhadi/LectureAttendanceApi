import App from './app';
import AuthenticationController from './controllers/authentication/authentication.controller';
import UserController from './controllers/user/user.controller';

const app = new App(
  [
    new AuthenticationController(),
    new UserController()
  ],
);

app.listen();
