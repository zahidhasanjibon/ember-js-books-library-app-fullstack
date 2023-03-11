import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NewController extends Controller {
  @service store;
  @service router;
  @tracked name = '';
  @tracked address = '';
  @tracked phone = '';
  @tracked isAlertShow = false;

  @action createLibrary() {
    if (
      this.name.length > 1 &&
      this.address.length > 1 &&
      this.phone.length > 1
    ) {
      let library = this.store.createRecord('library', {
        name: this.name,
        address: this.address,
        phone: this.phone,
      });
      library
        .save()
        .then(() => {
          this.isAlertShow = 'thank you! your email saved to database';
          setTimeout(() => {
            this.isAlertShow = false;
          }, 2000);
          this.router.transitionTo('libraries');
        })
        .catch(() => {
          this.isAlertShow = 'failed to create library';
        });
    } else {
      this.isAlertShow = 'please provide all information';
      setTimeout(() => {
        this.isAlertShow = false;
      }, 2000);
    }
  }
}
