
import { Router } from 'express'
import { validateQuery } from '../../middlewares/validate.js'
import { asyncHandler } from '../../shared/async-handler.js'
import { CourseController } from './courses.controller.js'
import { listCoursesSchema } from './courses.schema.js'

export const courseRouter = Router()

courseRouter.get(
    '/',
    validateQuery(listCoursesSchema),
    asyncHandler(CourseController.index),
)