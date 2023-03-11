import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class LibraryComponent extends Component {
  @service store;
  @action removeLibrary(id) {
    let library = this.store.peekRecord('library', id);
    library.deleteRecord();
    library.save(); // => DELETE to /posts/1
  }
}
