export interface ITypedStorage<T> {
  length(): number;
  key<U extends keyof T>(index: number): U;
  setItem<U extends keyof T>(key: U, value: T[U]): void;
  getItem<U extends keyof T>(key: U): T[U] | null;
  removeItem<U extends keyof T>(key: U): void;
  clear(): void;
}

export interface TypedStorageOptions {
  storage: 'localStorage' | 'sessionStorage';
}

export default class TypedStorage<T> implements ITypedStorage<T> {
  private storage: Storage;

  constructor(options: TypedStorageOptions = { storage: 'localStorage' }) {
    this.storage = window[options.storage];
  }

  public length(): number {
    return this.storage.length;
  }

  public key<U extends keyof T>(index: number): U {
    return this.storage.key(index) as U;
  }

  public getItem<U extends keyof T>(key: U): T[U] | null {
    const item = this.storage.getItem(key.toString());

    if (item === null) {
      return item;
    }

    try {
      return JSON.parse(item) as T[U];
    } catch {
      return (item as unknown) as T[U];
    }
  }

  public setItem<U extends keyof T>(key: U, value: T[U]): void {
    this.storage.setItem(key.toString(), JSON.stringify(value));
  }

  public removeItem<U extends keyof T>(key: U): void {
    this.storage.removeItem(key.toString());
  }

  public clear(): void {
    this.storage.clear();
  }
}
