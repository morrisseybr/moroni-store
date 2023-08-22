export abstract class Repository<Entity> {
  abstract get(id: string): Promise<Entity>;
  abstract getAll(): Promise<Entity[]>;
  abstract save(entity: Entity): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
