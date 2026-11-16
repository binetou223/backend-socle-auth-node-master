import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes, type Sequelize, } from 'sequelize'

export class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
    declare id: CreationOptional<string>
    declare title: string
    declare description: CreationOptional<string | null>
    declare isPublished: CreationOptional<boolean>
    declare teacherId: CreationOptional<string | null>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    static initModel(sequelize: Sequelize): typeof Course {
        Course.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING(150),
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                isPublished: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    field: 'is_published', 
                },
                teacherId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                    field: 'teacher_id',
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    field: 'created_at',
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    field: 'updated_at',
                },
            },
            {
                sequelize,
                tableName: 'courses',
                modelName: 'Course',
                underscored: true,
            },
        )
        return Course
    }

  toSafeJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            is_published: this.isPublished,
            teacher_id: this.teacherId,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        }
    }
}
