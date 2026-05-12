import { userRepo } from "../../DB/Repos/user.repo.js";

export const getProfileService =  (req) => {

    return req.user
}

export const updateUserProfile = async (user , body) => { 
        
    const {_id} = user
    const { firstName , lastName , age , gender ,email} = body 
    console.log ({user , body});

    if(email) {
        const existingUser = await userRepo.findOne({email}, "email");
        if(existingUser){
            throw new Error ("Email Already Exists, Try New One" , {cause: {status:409}});
        }
    }

    return userRepo.updateById({
        id:_id ,
        data: { firstName , lastName , age , gender ,email} , 
        options:{new:true}
    });
}

export const getAllUsers = async () => {
    return userRepo.findAll({})
}

export const uploadProfilePicture = async ( user , file )=>{

    if(!file || !file.path) throw new BadRequestException('File is required');

    return UserRepository.updateWithFindById({
        id: user._id,
        data: { profilePicture: file.path },
        options:{new:true}
    });
}