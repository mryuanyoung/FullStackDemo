import { CONTAINER } from '../index';
import { RestController } from './Request';
import { getRepository } from 'typeorm';

export function Repo(entityName: string) {
    return function (constructor) {
        const entity = CONTAINER[entityName + '_ENTITY'];
        constructor.prototype.repo = getRepository(entity);
        RestController(constructor);
    }
}

export function MyEntity(constructor) {
    CONTAINER[constructor.name + '_ENTITY'] = constructor;
}