import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "./films.entity";
import {CreateFilmsDto} from "./dto/create-films.dto";
import {UpdateFilmDto} from "./dto/update-films.dto";
import {Op, Sequelize} from "sequelize";
import {SessionsService} from "../sessions/sessions.service";

function intersect(a: number[], b: number[]){
    let new_arr = [];
    for(let elemA of a){
        for(let elemB of b){
            if(elemB == elemA){
                new_arr.push(elemA)
            }}
    }
    return new_arr;
};

@Injectable()
export class FilmsService {
    constructor(
        @InjectModel(Film) private filmRepository: typeof Film,
        private sessionsService: SessionsService,
    ) {}

    async addFilm(filmDto: CreateFilmsDto) {
        const film = await this.filmRepository.findOne({where: {title: filmDto.title}})

        if (film) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'The film with this name already exists',
                },
                HttpStatus.OK,
            );
        }
        const newFilm = await this.filmRepository.create(filmDto);
        return newFilm;
    }
    async getAllFilms() {
        const films = await this.filmRepository.findAll({
            attributes: ['title', 'id', 'description', 'url', 'rating', 'genre', 'runtime', 'country', 'imdbRating']
        });
        return films;
    }

    async sortFilms (genre: string[], id: number[], value: string) {
        const filmsId = await this.sessionsService.getCurrentFilmsFromSessions();
        const currentId = intersect(filmsId, id);
        if (genre.length === 0 && id.length === 0) {
            const films = await this.filmRepository.findAll({
                order: [
                    ['imdbRating', value]
                ]
            });
            return films;
        }

        if (genre.length === 0  && id.length !== 0) {
            const films = await this.filmRepository.findAll({
               order: [
                    ['imdbRating', value]
                ],
                where: {
                    id: currentId
                }
            });
            return films;
        }

        if (genre.length !== 0  && id.length === 0) {
            const args = genre.map((item) => {
                return item.replace(/ /g,'_');
            }).join(' | ');

            const films = await this.filmRepository.findAll({
                where: {
                    genre: {
                        [Op.match]: Sequelize.fn('to_tsquery', args)
                    },
                },
                order: [
                    ['imdbRating', value]
                ],
            });
            return films;
        }

        if (genre.length !== 0  && id.length !== 0) {
            const args = genre.map((item) => {
                return item.replace(/ /g,'_');
            }).join(' | ');

            const films = await this.filmRepository.findAll({
                where: {
                    id: currentId,
                    genre: {
                        [Op.match]: Sequelize.fn('to_tsquery', args)
                    },
                },
                order: [
                    ['imdbRating', value]
                ],
            });
            return  films;
        }
    }

    async getFilmsById(id: number[]) {
        const films = await this.filmRepository.findAll({
            where: {
                id
            },
        });
        return films;
    }


    async getOneFilm(id: number) {
        const film = await this.filmRepository.findOne({
            attributes: ['title', 'id', 'description', 'url', 'rating', 'genre', 'runtime', 'country', 'imdbRating'],
            where: {
                id
            }}
        );
        if (!film) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no film with this id in the system',
                },
                HttpStatus.OK,
            );
        }
        return film.dataValues;
    }

    async deleteFilm(id: number) {
        const film = await this.filmRepository.findOne({where: {id}});
        if (film) {
            const deletedFilm = await this.filmRepository.destroy({
                where: {
                    id,
                }
            })
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no film with this name in the system',
                },
                HttpStatus.OK,
            );
        }
    }

    async updateFilmInfo(filmDto: UpdateFilmDto) {
        const {id, ...others} = filmDto;
        const updateFilmInfo = await this.filmRepository.update({...others}, {
            where: {
                id
            }
        });
        return updateFilmInfo;
    }

}
