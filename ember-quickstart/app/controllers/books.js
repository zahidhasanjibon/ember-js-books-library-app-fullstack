import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
export default class BooksController extends Controller {
  @tracked books = this.model.books;
  @tracked authors = this.model.authors;
  @tracked libraries = this.model.libraries;
  //   @tracked isEditingTitle = false;
  //   @action editTitle() {
  //     this.isEditingTitle = true;
  //   }
  //   @action cancelTitle() {
  //     console.log('in');
  //     this.isEditingTitle = false;
  //   }
  //   @action saveTitle() {
  //     this.isEditingTitle = true;
  //   }
}
