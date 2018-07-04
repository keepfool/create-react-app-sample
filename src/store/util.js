export function subscribe (store, listener) {
  store.subscribe(listener.bind(undefined, store))
}