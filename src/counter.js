/**
 * @deprecated — NO FORMA PARTE DEL FLUJO ACTUAL.
 * Solo era usado por src/main.js (boilerplate de Vite).
 * No se usa en ninguna parte de la app actual.
 */

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
