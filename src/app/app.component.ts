import { Component, OnInit } from '@angular/core';
import { A, O, P, S, U, Card } from 'src/dto/carddto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  categories: string[][] = [['P', 'yellow'], ['O', 'navy'], ['A', 'grey'], ['?', 'green'], ['S', 'red']];

  nCard: number | undefined;
  card: Card | undefined;
  cat: string = "";

  p1: P = new P(1, 'DISCARICA');
  o1: O = new O(1, 'TOGA');
  a1: A = new A(0, 'SOLCARE');
  u1: U = new U(0, 'PORTA ASCIUGAMANO');
  s1: S = new S(0, 'AURORA BOREALE');

  p2: P = new P(1, 'ATTORE');
  o2: O = new O(0, 'ARACHIDE');
  a2: A = new A(0, 'ANNEGARE');
  u2: U = new U(1, 'MATTO');
  s2: S = new S(0, 'CAOS');

  cardList: Map<number, Card> = new Map();
  cards: Card[] = [
    { p: this.p1, o: this.o1, a: this.a1, u: this.u1, s: this.s1 },
    { p: this.p2, o: this.o2, a: this.a2, u: this.u2, s: this.s2 },
    ];

  ngOnInit(): void {
    this.cards.forEach((category, index) =>
      this.cardList.set(index + 1, category)
    );
  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  drawCard(cat: string) {
    let len = this.cardList.size;
    const rndInt = this.randomIntFromInterval(1, len);

    this.cat = cat;
    this.nCard = rndInt;
    this.card = this.cardList.get(this.nCard);
  }
}
