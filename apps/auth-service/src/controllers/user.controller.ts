import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service.js';

export class UserController {
  private userService = new UserService();

  /**
   * Fetches a user profile by UID
   */
  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { uid } = req.params;
      const data = await this.userService.getProfile(uid!);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User profile fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Updates an existing user profile
   */
  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { uid } = req.params;
      const data = await this.userService.updateProfile(uid!, req.body);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User profile updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;