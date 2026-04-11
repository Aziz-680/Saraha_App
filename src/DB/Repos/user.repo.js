import { BaseRepository } from './base.repo.js';
import User from '../Models/user.model.js'; // Adjust path if you use an index.js export

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

}

export const userRepo = new UserRepository();