import { IUpdateProjectStatusData } from '../domain/models/IUpdateProjectStatusData';
import { IProjectsRepository } from '../domain/repositories/IProjectsRepository';
import { invalidateRedis } from '../../../shared/cache/RedisCache';

export class UpdateProjectStatusService {
  constructor(
    private projectsRepository: IProjectsRepository
  ) {}

  async execute({id, development}: IUpdateProjectStatusData) {
    const projectExists = await this.projectsRepository.findById(id);

    if(!projectExists) {
      throw new Error('This project doesn\'t exists');
    }

    if(!development) {
      throw new Error('An action is required');
    }

    invalidateRedis('sloteam-PROJECTS_LIST');

    await this.projectsRepository.updateStatus({
      id, development
    });
  }
}
