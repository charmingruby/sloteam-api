import { IUpdateProjectData } from '../domain/models/IUpdateProjectData.model';
import { IProjectsRepository } from '../domain/repositories/IProjectsRepository';
import { invalidateRedis } from '../../../shared/cache/RedisCache';

export class UpdateProjectService {
  constructor(
    private projectsRepository: IProjectsRepository
  )
  {}

  async execute({id, description, icon}: IUpdateProjectData) {
    const projectExists = this.projectsRepository.findById(id);

    if(!projectExists) {
      throw new Error('This project doesn\'t exists');
    }

    if(!description && !icon) {
      throw new Error('Nothing to change');
    }

    invalidateRedis('sloteam-PROJECTS_LIST');

    await this.projectsRepository.update({
      id, description, icon
    });
  }
}
