import type { Request, Response } from 'express'
import { sendSuccess } from '../../shared/api-response.js'
import { CourseService } from './courses.services.js'
import type { ListCoursesQuery } from './courses.schema.js'

const service = new CourseService()

export const CourseController = {
    async index(request: Request, response: Response) {
        const query = request.validated?.query as ListCoursesQuery

        const result = await service.list({
            page: query.page ?? 1,
            perPage: query.par_page ?? 20,
            ...(query.search ? { search: query.search } : {}),
            ...(query.is_published !== undefined ? { isPublished: query.is_published } : {}),
            ...(query.teacher_id ? { teacherId: query.teacher_id } : {}),
        })

        return sendSuccess(response, result.courses, 200, result.pagination)
    },
}