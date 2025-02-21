declare global {
  interface ChangeEvent<T = Element> {
    target: T & {
      checked?: boolean;
      value: string;
    };
  }
}

export {} 