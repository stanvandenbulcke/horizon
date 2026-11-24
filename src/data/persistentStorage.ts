/**
 * Vraagt de browser om de opslag van Horizon "blijvend" te maken, zodat je gegevens niet
 * gewist worden als je toestel plaats tekort heeft. Werkt niet overal, maar het kan geen kwaad.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) {
    return false;
  }
  if (await navigator.storage.persisted()) {
    return true;
  }
  return navigator.storage.persist();
}
