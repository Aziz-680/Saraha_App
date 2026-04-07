export class BaseRepository {
    // We pass the specific Mongoose model (like User or Note) into the constructor
    constructor(model) {
        this.model = model;
    }

    // 1. Create a new document
    async create(data) {
        return await this.model.create(data);
    }

    // 2. Find multiple documents (with optional filtering)
    async findAll(filter = {}) {
        return await this.model.find(filter);
    }

    // 3. Find a single document by its ID
    async findById(id) {
        return await this.model.findById(id);
    }

    // 4. Find one document by specific criteria (like email)
    async findOne(filter) {
        return await this.model.findOne(filter);
    }

    // 5. Update a document by ID
    async update(id, data) {
        // { new: true } ensures Mongoose returns the updated document, not the old one
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    // 6. Delete a document by ID
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}