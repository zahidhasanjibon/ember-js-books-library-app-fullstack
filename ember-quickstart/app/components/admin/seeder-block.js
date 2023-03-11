import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class AdminSeederBlockComponent extends Component {
  @service store;
  @tracked libraryNumber = 0;
  @tracked authorBookNumber = 0;
  @tracked isAlertShow = false;

  // @action generateLibrary() {
  //   if (this.libraryNumber > 1 && this.libraryNumber <= 20) {
  //     let library = this.store.createRecord('library', {
  //       libraryNumber: this.libraryNumber,
  //     });
  //     library
  //       .save()
  //       .then(() => {
  //         this.isAlertShow = 'thank you! library created successfully';
  //         setTimeout(() => {
  //           this.isAlertShow = false;
  //         }, 2000);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         this.isAlertShow = 'failed to create library';
  //       });
  //   } else {
  //     this.isAlertShow = 'please provide library number';
  //     setTimeout(() => {
  //       this.isAlertShow = false;
  //     }, 2000);
  //   }
  // }
  @action deleteAllLibraries() {
    const allLibraries = this.args.allData.libraries;
    allLibraries.map((library) => library.destroyRecord());
  }

  @action deleteAllAuthorsANdBook() {
    const allAuthors = this.args.allData.authors;
    const allBooks = this.args.allData.books;

    allAuthors.map((author) => author.destroyRecord());
    allBooks.map((book) => book.destroyRecord());
  }
}
