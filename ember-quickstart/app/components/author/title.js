import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class AuthorTitleComponent extends Component {
  @service store;
  @tracked isEditingAuthor = false;
  @tracked nameValue = this.args.name;

  @action editAuthorName() {
    this.isEditingAuthor = true;
  }
  @action cancelAuthorName() {
    this.isEditingAuthor = false;
  }
  @action saveAuthorName(id) {
    this.store.findRecord('author', id).then((author) => {
      author.name = this.nameValue;
      author.save().then(() => (this.isEditingAuthor = false));
    });
  }
}
