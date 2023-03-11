import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LibrariesComponent extends Component {
  @tracked query = '';
}
