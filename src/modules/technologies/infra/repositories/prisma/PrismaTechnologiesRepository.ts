import { Technology } from '@prisma/client';
import { prisma } from '../../../../../config/prisma';
import { ICreateTechnologyData } from '../../../domain/models/ICreateTechnologyData';
import { IUpdateTechnologyData } from '../../../domain/models/IUpdateTechnologyData.model';
import { ITechnologiesRepository } from '../../../domain/repositories/ITechnologiesRepository';
import { IDeveloperTechnologyData } from '../../../domain/models/IDeveloperTechnologyData.model';

export class PrismaTechnologiesRepository implements ITechnologiesRepository {
  async index(): Promise<Technology[] | undefined> {
    return await prisma.technology.findMany();
  }

  async create({ name, description }: ICreateTechnologyData): Promise<void> {
    await prisma.technology.create({
      data: {
        name,
        description
      }
    });
  }

  async findById(id: string): Promise<Technology | undefined> {
    return await prisma.technology.findFirst({
      where: {
        id
      }
    });
  }

  async findByName(name: string): Promise<Technology | undefined> {
    return await prisma.technology.findFirst({
      where: {
        name
      }
    });
  }

  async update({ id, name, description }: IUpdateTechnologyData): Promise<void> {
    await prisma.technology.update({
      where: {
        id
      },
      data: {
        name,
        description
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.technology.delete({
      where: {
        id
      }
    });
  }

  async addDeveloperToTechnology({technologyId, developerId}: IDeveloperTechnologyData): Promise<void> {
    await prisma.developersTechnologies.create({
      data: {
        technologyId,
        developerId
      }
    });
  }

  async removeDeveloperFromTechnology({technologyId, developerId}: IDeveloperTechnologyData): Promise<void> {
    await prisma.developersTechnologies.delete({
      where: {
        developerId_technologyId: {
          developerId,
          technologyId
        }
      }
    });
  }

  async checkDeveloperInTechnology({technologyId, developerId}: IDeveloperTechnologyData): Promise<IDeveloperTechnologyData | undefined> {
    return await prisma.developersTechnologies.findFirst({
      where: {
        developerId,
        technologyId
      }
    });
  }
}
