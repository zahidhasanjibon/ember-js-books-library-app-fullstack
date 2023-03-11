import Model, { attr, belongsTo } from '@ember-data/model';

export default class EmailInvitationModel extends Model {
  @attr email;
  @belongsTo('library') library;
}
