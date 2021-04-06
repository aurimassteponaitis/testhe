export function deleteFromLocalStorage(name: string): void {
  localStorage.removeItem(name);
}

export function getFromLocalStorage(name: string): string | null {
  return localStorage.getItem(name) || null;
}

export function setObjectToLocalStorage(name: string, data: unknown): void {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getObjectFromLocalStorage<T>(name: string): T | null {
  const data = getFromLocalStorage(name);
  if (data) {
    try {
      const parsed = JSON.parse(data) as T;
      if (Object.keys(parsed).length) {
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  return null;
}
