const loginRoute = require('../controllers/login.controller')
const ScreenRoute = require('../controllers/screen.controller')
const MovieRoute = require('../controllers/movie.controller')
const TicketRoute = require('../controllers/ticket.controller')
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
    method: 'PUT',
    path: '/create/update/screen/{id}',
    handler: ScreenRoute.updateScreen
},

{
    method: 'PUT',
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

{
    method: 'POST',
    path: '/create/new/ticket',
    handler: TicketRoute.bookTicket
},

]