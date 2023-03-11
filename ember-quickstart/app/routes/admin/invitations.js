/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable ember/classic-decorator-hooks */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class AdminInvitationsRoute extends Route {
  @service store;
  async model() {
    return this.store.findAll('emailInvitation');
  }
  // beforeModel(transition) {
  //   debugger;
  // }
  // model(params, transition) {
  //   debugger;
  // }
  // afterModel(model, transition) {
  //   debugger;
  // }
  // activate() {
  //   debugger;
  // }
  // setupController(controller, model) {
  //   debugger;
  // }
  // renderTemplate(controller, model) {
  //   debugger;
  // }
}
