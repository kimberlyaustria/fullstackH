/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 *      ClassroomInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Classroom name.
 */

import express, { NextFunction, Request, Response } from 'express';
import { ClassroomInput } from '../types';
import classroomService from '../service/classroom.service';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classroom:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new classroom.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClassroomInput'
 *      responses:
 *         200:
 *            description: The created classroom.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Classroom'
 */
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classroom = <ClassroomInput>req.body;
        const result = await classroomService.createClassroom(classroom);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { classroomRouter };
