import {
    body,
    validationResult
}
from "express-validator";

export const validateProfile = [
    body("followers")
    .optional()
    .isNumeric()
    .withMessage("Followers must be a Number"),

     body("engagementRate")
     .optional()
     .isNumeric()
     .withMessage("Engagement rate must be a number"),

     (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                errors:errors.array()
            });
        }
        next();
     }

];