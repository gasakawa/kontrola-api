import { Module } from 'domain/models';

export interface IModuleRepository {
  list: (userId: string) => Promise<Module[]>;
}
