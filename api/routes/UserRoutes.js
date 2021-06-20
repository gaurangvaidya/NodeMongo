const router = require('express').Router();
const {
    register, getUserById, getAll,deleteUser, updateUser,login
   
} = require('../controllers/UserController')

const { verifyToken } = require('../middlewares/authentication');

const userRoutes = (app) =>{


    router.post('/',register);
    router.get('/:id',getUserById);
    router.get('/',verifyToken,getAll);
    router.delete('/:id',deleteUser);
    router.patch('/:id',updateUser);
    router.post('/login',login);


    app.use('/api/user',router);
}


module.exports  = userRoutes;