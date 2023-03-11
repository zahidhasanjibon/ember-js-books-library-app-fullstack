import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { faker } from '@faker-js/faker';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';
export default class AdminSeederController extends Controller {
  @service store;
  @tracked libraryNumber = 0;
  @tracked authorBookNumber = 0;
  @tracked isAlertShow = false;

  _saveRandomLibrary() {
    return this.store.createRecord('library').randomize().save();
  }

  _saveRandomAuthor() {
    return this.store.createRecord('author').randomize().save();
  }

  async _selectRandomLibrary() {
    const getLibrary = async () => {
      let libraryData = await this.store.peekAll('library');
      if (libraryData.length > 0) {
        let randomNumber = Math.round(Math.random() * libraryData.length - 1);

        return libraryData.objectAt(randomNumber);
      }
      if (libraryData.length < 1) {
        const data = await this.store.findAll('library');
        let randomNumber = Math.round(Math.random() * data.length - 1);

        return data.objectAt(randomNumber);
      }
    };

    return await getLibrary();

    // Please note libraries are records from store, which means this is a DS.RecordArray object, it is extended from
    // Ember.ArrayProxy. If you need an element from this list, you cannot just use libraries[3], we have to use
    // libraries.objectAt(3)
    // const libraries = this.get('libraries');
    // const size = libraries.get('length');

    // Get a random number between 0 and size-1
    // const randomItem = Faker.random.number(size - 1);
    // return libraries.objectAt(randomItem);
  }

  async _generateSomeBooks(author) {
    const bookCounter = faker.random.numeric(1);
    let books = [];
    // let author = author

    for (let j = 0; j < bookCounter; j++) {
      const library = await this._selectRandomLibrary();

      console.log(library);
      console.log(author);

      console.log(library.id);
      console.log(author.id);
      // Creating and saving book, saving the related records also are take while, they are all a Promise.
      const bookPromise = this.store
        .createRecord('book')
        .randomize(author, library)
        .save()
        .then(() => author.save())

        // guard library in case if we don't have any
        .then(() => library && library.save());
      books.push(bookPromise);
    }

    // Return a Promise, so we can manage the whole process on time
    return all(books);
  }

  @action generateLibraries(volume) {
    const counter = parseInt(volume);

    let savedLibraries = [];

    for (let i = 0; i < counter; i++) {
      savedLibraries.push(this._saveRandomLibrary());
    }
    this.libraryNumber = 0;
  }

  @action generateBooksAndAuthors(volume) {
    const counter = parseInt(volume);
    let booksWithAuthors = [];

    for (let i = 0; i < counter; i++) {
      const books = this._saveRandomAuthor().then((newAuthor) =>
        this._generateSomeBooks(newAuthor)
      );
      booksWithAuthors.push(books);
    }
    this.authorBookNumber = 0;
  }
}
