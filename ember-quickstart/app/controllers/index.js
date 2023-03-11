import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { faker } from '@faker-js/faker';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @service store;
  @tracked isBtnDisabled = true;
  @tracked isAlertShow = false;
  @tracked emailValue = '';

  @action checkEmailValidation(event) {
    function isValidEmail(email) {
      // Regular expression to match an email address
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Test the email address against the regular expression
      return emailRegex.test(email);
    }
    if (isValidEmail(event.target.value)) {
      this.isBtnDisabled = false;
    } else {
      this.isBtnDisabled = true;
    }
  }
  @action postEmailForInvite() {
    let emailInvite = this.store.createRecord('emailInvitation', {
      email: this.emailValue,
    });
    emailInvite
      .save()
      .then(() => {
        this.isAlertShow = 'thank you! your email saved to database';
        setTimeout(() => {
          this.isAlertShow = false;
        }, 2000);
      })
      .catch(() => {
        this.isAlertShow = 'failed to invite email';
        // console.error('Failed to create record:', error);
      });
    this.emailValue = '';
    this.isBtnDisabled = true;
  }
  @action generate() {
    function createRandomUser() {
      return {
        name: `${faker.internet.userName()} library`,
        address: faker.address.city(),
        phone: faker.phone.number(),
      };
    }

    let res = createRandomUser();
    console.log(res);
  }
}
