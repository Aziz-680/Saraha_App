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

    async update(id, data) {
        // { new: true } ensures Mongoose returns the updated document, not the old one
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async deleteOne(filter) {
        return await this.model.deleteOne(filter);
    }

    deleteMany(){}

}