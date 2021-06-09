const router = require('express').Router();
const {
    register, getUserById, getAll,deleteUser, updateUser
   
} = require('../controllers/UserController')

const userRoutes = (app) =>{


    router.post('/',register);
    router.get('/:id',getUserById);
    router.get('/',getAll);
    router.delete('/:id',deleteUser);
    router.patch('/:id',updateUser);


    app.use('/api/user',router);
}


module.exports  = userRoutes;