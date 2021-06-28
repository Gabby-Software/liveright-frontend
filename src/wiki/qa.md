# The QA object

### ***Introduction***
The QA object suppose to help PM, QA or anyone who want to report a bug to give a relevant debug information.
 
### ***For PM, QA etc.***
You have now a `QA` object to use in console. the usage:  
 * [open the console in the browser](https://kb.mailster.co/how-can-i-open-the-browsers-console/)
 * Tap on a free space of the window (should be at the bottom) and type `QA.report()`.
 * A `.txt` file will downloaded. attach it to the bug report.
 
You also can add your own custom logs, which will then shown in the QA report in the relevant time/flow context.  
For that type on the console `QA.log("CUSTOM_LOG")`, where the `CUSTOM_LOG` is your log message (so replace CUSTOM_LOG with your message. however the quotes around should stay)

### ***For developers***
 * You can find the QaManager in `/managers/qa.manager.ts`. 
 * You can always add log to QA stack using `qa.log(data: any, type: 'info'|'error')`.
 * Any log logged using the `logger` (can be found in `/managers/logger.manager.ts`) automatically added to QA log stack
 * Any API request/response/error automatically added to qa log stack

