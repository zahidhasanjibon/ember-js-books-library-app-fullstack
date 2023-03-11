import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class AdminSeederComponent extends Component {
  @service('library-info') allData;
  @service store;

  get getLibrary() {
    let libraryData = this.store.peekAll('library');
    console.log(libraryData.length);
    if (libraryData.length < 1) {
      return this.store.findAll('library').then((data) => {
        console.log(data.length);
      });
    }
    return libraryData;
  }
}
