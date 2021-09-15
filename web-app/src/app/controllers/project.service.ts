import {Inject, Injectable} from '@angular/core';
import {ProjectRepository} from '../../logic/repositories/project.repository';
import {ProjectController} from '../../logic/controllers/project.controller';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends ProjectController {

  constructor(@Inject('ProjectRepository') private dao: ProjectRepository) {
    super(dao);
  }

}
