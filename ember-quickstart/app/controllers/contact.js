import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class ContactController extends Controller {
  @service store;

  @tracked emailAddress = '';
  @tracked message = '';
  @tracked isBtnDisabled = true;
  @tracked isAlertShow = '';
  @tracked isModalShow = false;

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
  @action submitMessage() {
    if (this.message.length < 5) {
      this.isAlertShow = 'message should be at least 5 charrecter';
      this.isModalShow = false;
      setTimeout(() => {
        this.isAlertShow = false;
      }, 2000);
    } else {
      this.isModalShow = true;
    }
  }

  @action clearForm() {
    this.message = '';
    this.emailAddress = '';
  }
}
