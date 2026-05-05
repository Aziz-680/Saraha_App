export class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findAll(filter = {}) {
        return await this.model.find(filter);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findOne(filter) {
        return await this.model.findOne(filter);
    }

    update({filter , data , options}) {
        return  this.model.updateOne(filter , data , options);
    }

    updateById({id, data , options}) {
        return  this.model.findByIdAndUpdate(id, data , options);
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async deleteOne(filter) {
        return await this.model.deleteOne(filter);
    }

    deleteMany(){}

}