import { controllerDecorator } from "../common/utils/controller.decorator";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { HttpError } from "../common/utils/HttpError";
import db from '../../prisma/prisma.client'


const { SECRET_KEY, TOKEN_EXPERATION } = process.env;

export const signUp = controllerDecorator(async (req, res) => {
    const { username, password } = req.body;
    const user = await db.user.findUnique({ where: { username } });
    if (user) {
        throw HttpError(409, "Such user already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
        data: {
            username: username,
            password: hashPassword,
        },
    });

    const token = jwt.sign({id: newUser.id}, SECRET_KEY, { expiresIn: TOKEN_EXPERATION });
    res.setHeader('Authorization', token);
    res.status(201).json({
        username,
    });
});

export const signIn = controllerDecorator(async (req, res) => {
    const { username, password } = req.body;
    const user = await db.user.findUnique({ where: { username } });
    if (!user) {
        throw HttpError(401, "Invalid password or username");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Invalid password or email");
    }

    const token = jwt.sign({id: user.id}, SECRET_KEY, { expiresIn: TOKEN_EXPERATION });
    res.setHeader('Authorization', token);
    res.json({
        username: user.username
    });
});
