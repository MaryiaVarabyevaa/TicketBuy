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

    async checkComment(userId: number, filmId: number) {
        const comment = await this.commentRepository.findOne({
            where: {
                userId,
                filmId
            }
        });
        if (!comment) {
            return false;
        }
        return  true;
    }

    async updateComment(commentDto: CreateCommentDto) {
        const {userId, filmId, text, rating} = commentDto;
        const updateComment = await this.commentRepository.update({text, rating}, {
            where: {
                userId,
                filmId
            }
        });
        return updateComment;
    }

    async getRating(filmId: number) {
        let totalRating = 0;
        const ratings = await this.commentRepository.findAll({
            where: {
                filmId,
            },
            attributes: ['rating']
        });

        if (!ratings) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no such film in the system',
                },
                HttpStatus.OK,
            );
        }

        ratings.map(({rating}) => {
            totalRating += rating
        })

        return totalRating / ratings.length;

    }
}
