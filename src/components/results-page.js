import { algoliasearch } from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { hits, pagination, refinementList, searchBox } from 'instantsearch.js/es/widgets';

import resultHit from '../templates/result-hit';

/**
 * Instant Search class to display content on main page.
 *
 * @class ResultsPage
 */
class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * Handles creating the search client and creating an instance of instant search.
   *
   * @private
   * @returns {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
    });
  }

  /**
   * Adds widgets to the Algolia instant search instance.
   *
   * @private
   * @returns {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#hits',
        templates: {
          item: resultHit,
        },
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
      }),
    ]);
  }

  /**
   * Starts instant search after widgets are registered.
   *
   * @private
   * @returns {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default ResultPage;
