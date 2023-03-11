import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class LibraryselectComponent extends Component {
  initial = this.args.initial;
  @action updateLibrary(event) {
    console.log(event.target.value);
    const singleBook = this.args.book;
    const allLibraries = this.args.libraries;
    let selectedLibrary = allLibraries.find(
      (rec) => rec.id === event.target.value
    );
    singleBook.library = selectedLibrary;
    singleBook.save().then(() => this.args.hideMenu());
  }
}
