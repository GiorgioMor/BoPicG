import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Subscription, interval } from 'rxjs';
import { Word } from 'src/dto/carddto';
import { MessageService } from 'primeng/api';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import * as data from '../../Python/cards.json';
import * as dataP from '../../Python/more_cards.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('squeezeExpand', [
      transition('normal <=> squeezed', animate('0.82s cubic-bezier(.36,.07,.19,.97)', keyframes([
      style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
      style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
      style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
      style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
      style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
      style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
      style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
      style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
      style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 })
    ])))
    ])
  ]
})

export class AppComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  buttonState: string = "normal";
  curSec: number = 0;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 100;
  bufferValue = 100;
  dice: number | undefined;

  timer = 65;
  sub: Subscription | undefined;
  blur = false;

  categories: [string, string, string][] = [
    ['P', 'yellow', 'Persone/Luoghi/Animali'],
    ['O', 'navy', 'Oggetti'],
    ['A', 'grey', 'Azioni'],
    ['?', 'green', 'Difficoltà'],
    ['S', 'red', 'Sfida']
  ];

  catShow = "";
  data: any[] = (data as any).default;
  proverbi: any[] = (dataP as any).default;
  pickedWord: Word = { num: -1, word: '' };
  wordList: { [key: string]: Word[] } = {};

  isDarkMode = false;

  ngOnInit(): void {
    this.data.forEach((item) => {
      this.addToCategory(item.cat, new Word(item.num, item.par));
    });

    this.proverbi.forEach((item) => {
      this.addToCategory('?', new Word(item.num, item.par));
    });
  }

  addToCategory(category: string, word: Word): void {
    if (!this.wordList[category]) {
      this.wordList[category] = [];
    }
    this.wordList[category].push(word);
  }

  randomIntFromInterval(min: number, max: number): number {
    const cryptoArray = new Uint32Array(1);
    window.crypto.getRandomValues(cryptoArray);

    const range = max - min + 1;
    const randomNumber = cryptoArray[0] / (2 ** 32); // Convert to a float between 0 and 1
    return Math.floor(randomNumber * range) + min;
  }

  getRandomWord(cat: string): void {
    const categoryArray = this.wordList[cat];
    if (categoryArray?.length) {
      const len = categoryArray.length;
      const rndInt = this.randomIntFromInterval(0, len - 1);
      this.pickedWord = categoryArray[rndInt];
    }
  }

  drawCard(cat: string): void {
    this.messageService.clear();
    this.getRandomWord(cat);

    this.value = 100;
    this.curSec = 0;
    this.blur = false;
    this.sub?.unsubscribe();


    let challenge = document.getElementById("challenge") as HTMLVideoElement;

    switch (cat) {
      case 'S':
        challenge.play();
        this.showTopCenter();
        break;
      default:
        if (!this.pickedWord.num) {
          this.startTimer();
        } else {
          challenge.play();
          this.showTopCenter();
        }
    }
  }

  startTimer(): void {
    const time = this.timer;
    const timer$ = interval(1000);

    this.sub = timer$.subscribe((sec) => {
      this.value = 100 - sec * 100 / time;
      this.curSec = sec;
      let timeout = document.getElementById("timeout") as HTMLVideoElement;

      if (this.curSec === time) {
        timeout.play();
        this.sub?.unsubscribe();
        this.blur = false;
      }
    });
  }

  rollDice(): void {
    this.value = 100;
    this.curSec = 0;
    this.blur = false;
    this.sub?.unsubscribe();

    this.buttonState = (this.buttonState === 'normal') ? 'squeezed' : 'normal';

    this.dice = this.randomIntFromInterval(1, 6);
    console.log("è uscito: ", this.dice);

    var dice = document.getElementById('dice');
    for (var i = 1; i <= 6; i++) {
      dice?.classList.remove('show-' + i);
      if (this.dice === i) {
        dice?.classList.add('show-' + i);
      }
    }
  }

  setCat(cat: string) {
    this.catShow = cat;
  }

  toggleBlur() {
    this.blur = !this.blur;
  }

  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Sfida!', detail: 'Giocano tutti, niente tempo... Let\'s go!' });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
