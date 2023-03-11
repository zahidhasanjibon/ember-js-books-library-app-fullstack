import Service, { inject as service } from '@ember/service';

export default class LibraryInfoService extends Service {
  @service store;

  // getLibrary() {
  //   let libraryData = this.store.peekAll('library');
  //   console.log(libraryData.length);
  //   if (libraryData.length < 1) {
  //     return this.store.findAll('library').then((data) => {
  //       console.log(data.length);
  //     });
  //   }
  //   return libraryData;
  // }
}
