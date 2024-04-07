import { SignInRequestDto } from '../common/dto/request';
import { signIn, signUp } from '../controllers';
import express from 'express';
import { validateBody } from '../middlewares';

const router = express.Router();

router.post(
    "/signup",
    validateBody(SignInRequestDto),
    signUp
);

router.post(
    "/signin",
    validateBody(SignInRequestDto),
    signIn
);

export default router;

