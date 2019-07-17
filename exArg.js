0

//Ok, so using your sample command as an example, let's say someone enters this, and you want to know how to handle it:

//>addplayer jimmybenoit, Example Crew, Captain, Example Longsword, Example Fruit, Gainer, Cook, Other Information Goes here

//I assume you have already figured out how to check the command prefix, and split the command from the args, but I'll show how I would do that below.

// get message content from user
let input = message.content;

// get command prefix ">"
//  -> probably check that this is valid, if you haven't done that already
let prefix = input[0];

// get command (1 word)
let command = input.substr(1).split(' ')[0];

// get args - looks like you've already done this
let args = command.substr( command.indexOf(' ') + 1 );

// Check if command is valid, as you have in your code
if (command === "addplayer") {
    // split args into an array, comma delimited
    // -> also map .trim() function to remove beginning / ending spaces
    args = args.split(',').map(elem => elem.trim());

    // split args into vars
    let [name, crew, rank, weapon, df, talent, profession, ...other] = args;

    // .. do the rest of your code
}
//The key here, is you use .split(',') to turn the args string into an array, split on ',' character (and use .trim() to clear out whitespace from each element, THEN you assign all of your variables to the args array.

//The final ...other] is used to catch any remaining arguments - so if your text 'Other information Goes here' had commas, all of those extra arguments would get stored (as an array) in the other variable. If you want to put them all back together, you can use .join(',') to separate them by comma.

