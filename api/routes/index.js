const userRoutes = require('./UserRoutes');


const routes = (app) =>{


    userRoutes(app);


}


module.exports = routes;