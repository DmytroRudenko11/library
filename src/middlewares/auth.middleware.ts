import { HttpError } from '../common/utils/HttpError';
import * as jwt from 'jsonwebtoken'
import db from '../../prisma/prisma.client'

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await db.user.findUnique({ where: { id } });
        if (!user) {
            next(HttpError(401));
        }
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401));
    }
};
