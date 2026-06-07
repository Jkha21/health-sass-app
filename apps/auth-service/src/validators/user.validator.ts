import Joi from "joi";
import { Request, Response, NextFunction } from "express";

class UserValidator {
  /**
   * Validates profile updates payload configurations
   */
  public updateProfile = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      displayName: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .custom((value: string, helpers) => {
          if (value.trim().length === 0) {
            return helpers.error("string.empty");
          }
          return value.trim();
        }, "Display name whitespace guard")
        .messages({
          "string.base":  "Display name must be a string",
          "string.empty": "Display name cannot be empty or whitespace only",
          "string.min":   "Display name must be at least 2 characters long",
          "string.max":   "Display name cannot exceed 50 characters",
        }),

      photoURL: Joi.string()
        .uri()
        .trim()
        .messages({
          "string.base":  "Photo URL must be a string",
          "string.uri":   "Photo URL must be a valid URI format (e.g., https://example.com/image.png)",
        }),
    })
      .min(1) // Ensures that at least one field is provided for mutations
      .messages({
        "object.min": "At least one profile field (displayName or photoURL) must be provided to execute an update",
      });

    const { error, value } = schema.validate(req.body, {
      abortEarly:   false,
      stripUnknown: true,
    });

    if (error) {
      return next(error);
    }

    req.body = value;
    next();
  };

  /**
   * Validates that the target uid URL param exists and is formatted correctly
   */
  public validateUid = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.string()
      .trim()
      .required()
      .messages({
        "string.base":  "User ID must be a string",
        "string.empty": "User ID parameter is required",
        "any.required": "User ID parameter is required",
      });

    const { error, value } = schema.validate(req.params.uid);

    if (error) {
      return next(error);
    }

    req.params.uid = value;
    next();
  };
}

export default UserValidator;