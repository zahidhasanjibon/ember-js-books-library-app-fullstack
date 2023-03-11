import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class AuthorselectComponent extends Component {
  initial = this.args.initial;
  @action updateAuthor(event) {
    const singleBook = this.args.book;
    const allAuthors = this.args.authors;
    let selectedAuthor = allAuthors.find(
      (rec) => rec.id === event.target.value
    );
    singleBook.author = selectedAuthor;
    singleBook.save().then(() => this.args.hideMenu());
  }
}
