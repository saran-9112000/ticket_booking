const loginRoute = require('../controllers/login.controller')
const ScreenRoute = require('../controllers/screen.controller')
const MovieRoute = require('../controllers/movie.controller')
module.exports = [

{
    method: 'POST',
    path: '/api/auth/signup',
    handler: loginRoute.signup
},

{
    method: 'POST',
    path: '/api/auth/login',
    handler: loginRoute.login
},

{
    method: 'POST',
    path: '/create/new/screen',
    handler: ScreenRoute.createScreen
},

{
    method: 'POST',
    path: '/create/new/movie',
    handler: MovieRoute.createMovie
},

{
    method: 'POST',
    path: '/create/update/screen/{id}',
    handler: ScreenRoute.updateScreen
},

{
    method: 'POST',
    path: '/create/update/movie/{id}',
    handler: MovieRoute.updateMovie
},

{
    method: 'DELETE',
    path: '/create/delete/screen/{id}',
    handler: ScreenRoute.deleteScreen
},

{
    method: 'DELETE',
    path: '/create/delete/movie/{id}',
    handler: MovieRoute.deleteMovie
},

]