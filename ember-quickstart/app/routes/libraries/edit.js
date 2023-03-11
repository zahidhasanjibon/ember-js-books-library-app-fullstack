import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LibrariesEditRoute extends Route {
  @service store;
  model(params) {
    return this.store.findRecord('library', params.library_id); // => GET /blog-posts/1
  }
}
