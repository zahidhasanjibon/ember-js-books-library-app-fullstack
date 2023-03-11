import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class BookAuthorComponent extends Component {
  @service store;
  @tracked isEditingAuthor = false;
  // @tracked titleValue = this.args.title;

  @action editAuthor() {
    this.isEditingAuthor = true;
  }
  @action cancelAuthor() {
    this.isEditingAuthor = false;
  }
}
