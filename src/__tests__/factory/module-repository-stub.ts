import { IModuleRepository } from 'data/protocols/db';
import { Module } from 'domain/models';

export class ModuleRepositoryStub implements IModuleRepository {
  async list(_userId: string): Promise<Module[]> {
    return new Promise(resolve =>
      resolve([
        {
          id: 1,
          name: 'Module',
          icon: 'icon',
          position: 1,
          routines: [
            {
              name: 'name_routine',
              link: 'link',
              position: 1,
              icon: 'icon_routine',
            },
          ],
        },
      ]),
    );
  }
}
