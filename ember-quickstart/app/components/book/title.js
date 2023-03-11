import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class BookTitleComponent extends Component {
  @service store;
  @tracked isEditingTitle = false;
  @tracked titleValue = this.args.title;

  @action editTitle() {
    this.isEditingTitle = true;
  }
  @action cancelTitle() {
    this.isEditingTitle = false;
  }
  @action saveTitle(id) {
    this.store.findRecord('book', id).then((book) => {
      book.title = this.titleValue;
      book.save().then(() => (this.isEditingTitle = false));
    });
  }
}
