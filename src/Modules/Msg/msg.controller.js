import {Router} from "express";

const msgController = Router();

msgController.get('/', (req,res) => {
    res.send('Msg Controller is working!');
});


export default msgController;