import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LibrarylistComponent extends Component {
  @tracked query = '';
}
