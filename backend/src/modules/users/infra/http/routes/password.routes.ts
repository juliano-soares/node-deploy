import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const posswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

posswordRouter.post('/forgot', forgotPasswordController.create);
posswordRouter.post('/reset', resetPasswordController.create);

export default posswordRouter;
