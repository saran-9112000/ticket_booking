const { Model } = require('objection');
const Movie = require('./movie.model')
class Booking extends Model {
    
  static get tableName() {
    return 'booking';
  };

  static get movieIdColumn() {
    return 'movieId';
  };

  static get userIdColumn() {
    return 'userId';
  };

  static get numberOfSeatsColumn() {
    return 'numberOfSeats';
  };

  static get seatsBookedColumn() {
    return 'seatsBooked';
  };

  static get totalAmountColumn() {
    return 'totalAmount';
  };

};
module.exports = Booking