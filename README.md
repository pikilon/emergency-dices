# Emergency dices
A Vue practice to generate set of dices for board games

# Features (functional)
 * Create/Edit Game sets
 * create dices (TODO)
 * roll all/selected dices on a gameset
 * add different colors dices to game sets
 * add different colors to a dice side
 * Can use emojis, numbers, symbols in dice sides
 * Generate sides from intervals or charStrings

# Technical features

 * No `npm` all libraries combined and minified by  jsdelivr.com
 * No bundler used, only source `js` files with `native imports`
 * Creates a `CSS` mixin to load `css` dinamically, selectors are shared and can be reused for automation tests.
 * Loads Markdown asynchronously, for example **to load this document**.
 * Stores `Vuex` updates on persitence layer (when will be enabled)
 * Constants instead of typing the site

## TODO

* new dice interface
* titles mixin to pages
* enable persitence
* implement more v-model

* adaptative dices (for bigger content)
* results equal, sum also custom
* export import
