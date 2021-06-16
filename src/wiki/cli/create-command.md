# Create CLI command

To create new CLI command, please go though following steps:

1. create new manager in `cli/bin/managers`
2. in the new manager, export a function. the function should receive an object, with the following params:
 * `info` an array of all words given with no `-` prefix
 * All words given with `-` prefix as key-value pairs.  
 **Example:** for command `lr change something -d example` will be triggered command `change` with params: {info:['something'], d: 'example'}
 * Export your function, and import it in `/bin/index.js`. add your function to the `commands` object at the top, such that `key` will be requested command name (in the above example is `change`), and the value - your function
 * Update `help` manager to list your command, and update `/wiki/cli/available-commands.md`
3. Update your module using `liveright update` command, or `yarn add ./cli`
