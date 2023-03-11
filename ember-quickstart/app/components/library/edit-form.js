import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LibraryEditFormComponent extends Component {
  @service store;
  @service router;

  @tracked name = this.args.formData.name;
  @tracked address = this.args.formData.address;
  @tracked phone = this.args.formData.phone;

  @action updateLibrary() {
    this.store.findRecord('library', this.args.formData.id).then((library) => {
      library.name = this.name;
      library.address = this.address;
      library.phone = this.phone;
      library.save().then(() => {
        this.router.transitionTo('libraries');
      });
    });
  }
}
