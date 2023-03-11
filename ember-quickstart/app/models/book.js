import Model, { attr, belongsTo } from '@ember-data/model';
import { faker } from '@faker-js/faker';

export default class BookModel extends Model {
  @attr title;
  @attr releaseYear;
  @belongsTo('author', { inverse: 'books', async: true }) author;
  @belongsTo('library', { inverse: 'books', async: true }) library;

  randomize(author, library) {
    this.title = faker.commerce.productName();
    this.releaseYear = faker.date.past();
    this.author = author;
    this.library = library;
    return this;
  }
}
