# The Logger

The logger object suppose to replace console for a few advantages:

- Each log logged using the logger automatically added to [QA logs](https://github.com/ColorElephantHQ/liveright-frontend/blob/master/src/wiki/qa.md) stack
- Logs can be filtered, so only logs containing one of the given filters will be executed (while they still will added to qa logs stack)
- Logs can be disabled, such that for ex. we can disable logs on prod server, while they still will be visibleon dev, and still be added to qa log stack on prod

**_Log commands_**

- `logger.log`
- `logger.info`
- `logger.warning`
- `looger.error`

Difference in prepended colored tag.

**_Config commands_**

- `logger.enableLogs` - enables log (default)
- `logger.disableLogs` - disable logs
- `logger.setFilter` - receive string, will logs only logs containing this string
- `logger.removeFilter` - removing the above filter
