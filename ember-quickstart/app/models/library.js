import Model, { attr, hasMany } from '@ember-data/model';
import { faker } from '@faker-js/faker';

export default class LibraryModel extends Model {
  @attr name;
  @attr address;
  @attr phone;
  @attr libraryNumber;
  @hasMany('book', { inverse: 'library', async: true }) books;

  randomize() {
    this.name = `${faker.company.name()} library`;
    this.address = faker.address.city();
    this.phone = faker.phone.number();
    return this;
  }
}
