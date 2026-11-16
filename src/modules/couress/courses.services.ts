import { CourseRepository, type ICourseRepository, type ListCoursesInput, } from './courses.repository.js'

export class CourseService {
    constructor(
        private readonly courses: ICourseRepository = new CourseRepository(),
    ) { }

    async list(input: ListCoursesInput) {
        const result = await this.courses.list(input)

        return {
            courses: result.rows.map((course) => course.toSafeJSON()),
            pagination: {
                page: input.page,
                per_page: input.perPage,
                total: result.count,
                total_pages: Math.ceil(result.count / input.perPage),
            },
        }
    }
}