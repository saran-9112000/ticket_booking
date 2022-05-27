const { Model } = require('objection');
const Screen = require('./screen.model')
class Movie extends Model {
    
  static get tableName() {
    return 'movies';
  };

  static get movieIdColumn() {
    return 'movieId';
  };

  static get screenIdColumn() {
    return 'screenId';
  };

  static get movieNameColumn() {
    return 'movieName';
  };

  static get movieTimingColumn() {
    return 'movieTiming';
  };

  static get availableSeatsColumn() {
    return 'available';
  };

  static relationMappings = {
    screen: {
      relation: Model.HasOneRelation,
      modelClass: Screen,
      join: {
        from: 'screenId',
        to: 'screen.screenId'
      }
    }
  };
  
};
module.exports = Movie