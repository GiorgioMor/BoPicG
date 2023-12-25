export class Category {
  constructor(
    public category: string,
    public value: number = 0,
    public word?: string
  ) {}
}

export class P extends Category {
  constructor(value: number, word: string) {
    super('P', value, word);
  }
}

export class O extends Category {
  constructor(value: number, word: string) {
    super('O', value, word);
  }
}

export class A extends Category {
  constructor(value: number, word: string) {
    super('A', value, word);
  }
}

export class U extends Category {
  constructor(value: number, word: string) {
    super('?', value, word);
  }
}

export class S extends Category {
  constructor(value: number, word: string) {
    super('S', value, word);
  }
}

export class Card {
  p: P | undefined;
  o: O | undefined;
  a: A | undefined;
  u: U | undefined;
  s: S | undefined;
}