import Model, { attr, hasMany } from '@ember-data/model';
import { faker } from '@faker-js/faker';

export default class AuthorModel extends Model {
  @attr name;
  @hasMany('book', { inverse: 'author', async: true }) books;

  randomize() {
    this.name = faker.name.fullName();
    return this;
  }
}
