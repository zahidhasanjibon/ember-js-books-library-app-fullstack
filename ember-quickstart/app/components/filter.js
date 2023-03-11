import Component from '@glimmer/component';

export default class FilterComponent extends Component {
  get results() {
    let { query, libraries } = this.args;
    if (query) {
      libraries = libraries.filter((lib) =>
        lib.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return libraries;
  }
}
