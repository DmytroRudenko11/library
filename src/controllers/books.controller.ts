import { controllerDecorator } from "../common/utils/controller.decorator";
import { HttpError } from "../common/utils/HttpError";
import db from '../../prisma/prisma.client'
const logger = require('../log')

export const getAll = controllerDecorator(async (req, res) => {
    const books = await db.book.findMany().catch((e) => {
        logger.error(`DB_ERROR >>book/getAll: ${e}`)
        throw HttpError(500);
    });
    res.json(books);
  });
  
export const getById = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const book = await db.book.findUnique({ where: { id } }).catch((e) => {
        logger.error(`DB_ERROR >>book/getById: ${e}`)
        throw HttpError(500);
    });
    if (!book) {
      throw HttpError(404, `Book with "${id}" ID is not found`);
    }
    res.json(book);
  });
  
export const add = controllerDecorator(async (req, res) => {
    const { id: userId } = req.user;
    const { title, author } = req.body
    const isBookExist = await db.book.findFirst({ where: { title, author } }).catch((e) => {
        logger.error(`DB_ERROR >>book/add: ${e}`)
        throw HttpError(500);
    });
    if (isBookExist) {
      throw HttpError(400, `Book "${title}" written by ${author} already exists`);
    }
    const book = await db.book.create({ data: {...req.body, userId} }).catch((e) => {
        logger.error(`DB_ERROR >>book/add: ${e}`)
        throw HttpError(500);
    });
    res.status(201).json(book);
  });
  
export const updateById = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const book = await db.book.update({
        where: {
          id
        },
        data: { 
            ...req.body
        },
      }).catch((e) => {
        logger.error(`DB_ERROR >>book/updateById: ${e}`)
        throw HttpError(500);
    });
    if (!book) {
      throw HttpError(404, `Book with "${id}" ID is not found`);
    }
    res.json(book);
  });
  
export const deleteById = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const deletedBook = await db.book.delete( {where: {
        id
      }}).catch((e) => {
        logger.error(`DB_ERROR >>book/deleteById: ${e}`)
        throw HttpError(500);
    });
    if (!deletedBook) {
        throw HttpError(404, `Book with "${id}" ID is not found`);
    }
    res.json('Success');
  });