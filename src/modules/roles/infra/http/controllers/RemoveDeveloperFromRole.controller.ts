import { Request, Response } from 'express';
import { PrismaRolesRepository } from '../../repositories/prisma/PrismaRolesRepository';
import { PrismaDevelopersRepository } from '../../../../developers/infra/repositories/prisma/PrismaDevelopersRepository';
import { RemoveDeveloperFromRoleService } from '../../../services/RemoveDeveloperFromRole.service';
import { FeedbackMessages } from '../../../../../shared/utils/feedbackMessages';

class RemoveDeveloperFromRoleController {
  async handle(req: Request, res: Response) {
    const { id: roleId } = req.params;
    const { developerId } = req.body;

    const prismaRolesRepository = new PrismaRolesRepository();
    const prismaDevelopersRepository = new PrismaDevelopersRepository();
    const removeDeveloperFromRole = new RemoveDeveloperFromRoleService(prismaRolesRepository, prismaDevelopersRepository);

    try {
      await removeDeveloperFromRole.execute({ roleId, developerId });
      const feedback = new FeedbackMessages('role', 'developer');
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

export default new RemoveDeveloperFromRoleController();
