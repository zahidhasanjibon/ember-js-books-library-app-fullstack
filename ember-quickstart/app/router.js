import EmberRouter from '@ember/routing/router';
import config from 'ember-quickstart/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('about');
  this.route('contact');

  this.route('admin', function () {
    this.route('invitations');
    this.route('seeder');
  });

  this.route('libraries', function () {
    this.route('new');
    this.route('edit', { path: '/:library_id/edit' });
  });
  this.route('author');
  this.route('books');
});
