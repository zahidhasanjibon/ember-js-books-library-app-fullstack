import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class BookLibraryComponent extends Component {
  @service store;
  @tracked isEditingLibrary = false;
  // @tracked titleValue = this.args.title;

  @action editLibrary() {
    this.isEditingLibrary = true;
  }
  @action cancelLibrary() {
    this.isEditingLibrary = false;
  }
}
