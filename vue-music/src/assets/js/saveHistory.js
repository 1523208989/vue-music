import storage from 'good-storage'
export default (arrName, model, len) => {
  const history = storage.get(arrName, []);
  const index = history.findIndex((item) => {
    return item === model
  });
  if (index === 0) return
  if (index > 0) {
    history.splice(index, 1)
  }
  history.unshift(model)
  if (len && history.length > len) history.pop()
  storage.set(arrName, history);
}