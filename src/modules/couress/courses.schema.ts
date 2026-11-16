    import { z } from 'zod'

    export const listCoursesSchema = z.object({
      page: z.coerce.number().int().min(1).default(1),
      par_page: z.coerce.number().int().min(1).max(100).default(20),
      search: z.string().trim().max(100).optional(),
      is_published: z.enum(['true', 'false']) .transform((value) => value === 'true').optional(),
      teacher_id: z.string().uuid().optional(),
    })

    export type ListCoursesQuery = z.infer<typeof listCoursesSchema>
