import { IModuleRepository } from 'data/protocols/db';
import { Module } from 'domain/models';
import prisma from '../client/prisma-client';

export class ModuleRepository implements IModuleRepository {
  async list(userId: string): Promise<Module[]> {
    const result = (await prisma.$queryRaw`select * from get_modules(${userId})`) as any;

    const { get_modules } = result[0];

    return get_modules as Module[];
  }
}
