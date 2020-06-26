export abstract class Controller {
    abstract async add(...args);
    abstract async list(...args);
    abstract async getById(...args);
    abstract async update(...args);
    abstract async delete(...args);
}
