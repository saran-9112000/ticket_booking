const { Model } = require('objection');

class Screen extends Model {
    
  static get tableName() {
    return 'screen';
  };

  static get screenIdColumn() {
    return 'screenId';
  };

  static get screenNumberColumn() {
    return 'screenNumber';
  };

  static get seatingCapacityColumn() {
    return 'seatingCapacity';
  };

};

module.exports = Screen