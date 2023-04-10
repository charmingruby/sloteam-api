import { Request, Response } from 'express';
import { PrismaRolesRepository } from '../../repositories/prisma/PrismaRolesRepository';
import { DeleteRoleService } from '../../../services/DeleteRole.service';

class DeleteRoleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaRepository = new PrismaRolesRepository();
    const deleteRole = new DeleteRoleService(prismaRepository);

    try {
      await deleteRole.execute(id);

      return res.status(204).send();
    } catch(err) {
      return res.status(400).json({
        error: err.message
      });
    }
  }
}

export default new DeleteRoleController();
