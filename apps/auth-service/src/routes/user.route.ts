import express, { IRouter } from 'express';
import { UserController } from '../controllers/user.controller.js';
import userValidator from '../validators/user.validator.js';

export class UserRoutes {
  private userController = new UserController();
  private userValidator = new userValidator();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = (): void => {
    this.router.get('/profile/:uid', this.userController.getProfile);
    
    this.router.put(
      '/profile/:uid', 
      this.userController.updateProfile
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;