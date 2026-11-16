import { Op, type WhereOptions } from 'sequelize'
import { Course } from './course.model.js'

export interface ListCoursesInput {
    page: number
    perPage: number
    search?: string
    isPublished?: boolean
    teacherId?: string
}

export interface ICourseRepository {
    list(input: ListCoursesInput): Promise<{ rows: Course[]; count: number }>
}

export class CourseRepository implements ICourseRepository {

    async list(input: ListCoursesInput): Promise<{ rows: Course[]; count: number }> {
        const cleanSearch = input.search?.trim()

        const where: WhereOptions = {
            ...(input.isPublished !== undefined ? { isPublished: input.isPublished } : {}),
            ...(input.teacherId ? { teacherId: input.teacherId } : {}),
            ...(cleanSearch
                ? {
                    [Op.or]: [
                        { title: { [Op.like]: `%${cleanSearch}%` } },
                        { description: { [Op.like]: `%${cleanSearch}%` } },
                    ],
                }
                : {}),
        }

        return Course.findAndCountAll({
            where,
            limit: input.perPage,
            offset: (input.page - 1) * input.perPage,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    association: 'teacher',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        })
    }
}