# ng2-redux-proto

An Angular2 app that demonstrates the use of Redux (sync and async actions). It has two actions:

1. `CurrentUser#setTimezone` - a simple synchronous action
2. `Articles#fetch` - an async action that triggers three actions sequentially: `fetching` -> `fetched` or `failure`

It also features the way to display/update the information and the progress in a component. 

## License

`ng2-redux-proto` is released under the [MIT License](http://www.opensource.org/licenses/MIT).
