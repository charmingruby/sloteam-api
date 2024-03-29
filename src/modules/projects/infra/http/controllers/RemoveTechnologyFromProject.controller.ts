import { Request, Response } from 'express';
import { PrismaProjectsRepository } from '../../repositories/prisma/PrismaProjectsRepository';
import { PrismaTechnologiesRepository } from '../../../../technologies/infra/repositories/prisma/PrismaTechnologiesRepository';
import { RemoveTechnologyFromProjectService } from '../../../services/RemoveTechnologyFromProject.service';
import { FeedbackMessages } from '../../../../../shared/utils/feedbackMessages';

class RemoveTechnologyFromProjectController {
  async handle(req: Request, res: Response) {
    const {id: projectId} = req.params;
    const {technologyId} = req.body;

    const prismaProjectsRepository = new PrismaProjectsRepository();
    const prismaTechnologiesRepository = new PrismaTechnologiesRepository();
    const removeTechnologyFromProject =  new RemoveTechnologyFromProjectService(prismaProjectsRepository, prismaTechnologiesRepository);

    try {
      await removeTechnologyFromProject.execute({projectId, technologyId});
      const feedback = new FeedbackMessages('project', 'technology');
      const message = feedback.unreferenced();

      return res.status(204).json({
        success: message
      });
    } catch(err) {
      return res.status(400).json({
        error: err.message
      });
    }
  }
}

export default new RemoveTechnologyFromProjectController();
