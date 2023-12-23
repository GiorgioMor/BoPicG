export class Category {
    constructor(
        public category: string,
        public color: string,
        public value?: number,
        public word?: string
    ) {}
}

export class P extends Category {
    constructor(value: number, word: string) {
        super('P', 'yellow', value, word);
    }
}

export class O extends Category {
    constructor(value: number, word: string) {
        super('O', 'navy', value, word);
    }
}

export class A extends Category {
    constructor(value: number, word: string) {
        super('A', 'grey', value, word);
    }
}

export class U extends Category {
    constructor(value: number, word: string) {
        super('?', 'green', value, word);
    }
}

export class S extends Category {
    constructor(value: number, word: string) {
    super('S', 'red', value, word);
    }
}

export class Card {
    p: P | undefined;
    o: O | undefined;
    a: A | undefined;
    u: U | undefined;
    s: S | undefined;
}
