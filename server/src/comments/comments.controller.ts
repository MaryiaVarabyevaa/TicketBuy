import {Body, Controller, Get, Param, ParseIntPipe, Post, Request} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}

    @Post('create')
    create(@Body() commentDto: CreateCommentDto) {
        return this.commentService.addComment(commentDto);
    }

    @Get(':id')
    getAll(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.commentService.getComments(id);
    }

    @Get()
    getAllComments() {
        return this.commentService.getAllComments();
    }

    @Post('delete')
    deleteComment(@Request() req) {
        return this.commentService.deleteComment(req.body.id);
    }
}
