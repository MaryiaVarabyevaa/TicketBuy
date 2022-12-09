import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "./comments.entity";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}

    async addComment(commentDto: CreateCommentDto) {
        const comment = await this.commentRepository.create(commentDto);
        return comment;
    }

    async getComments(id: number) {
        const comments = await this.commentRepository.findAll({
            where: {
               filmId: id
            }
        });
        return comments;
    }

    async getAllComments() {
        const comments = await this.commentRepository.findAll({
            attributes: { exclude: ['deletedAt'] }
        });
        return comments;
    }

    async deleteComment(id: number) {
        const comment = await this.commentRepository.findOne({where: {id}});
        if (comment) {
            const deletedComment = await this.commentRepository.destroy({
                where: {
                    id,
                }
            })
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no such comment',
                },
                HttpStatus.OK,
            );
        }
    }

}
