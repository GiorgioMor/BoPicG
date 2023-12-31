import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Subscription, interval } from 'rxjs';
import { A, O, P, S, U, Card, CardToShow } from 'src/dto/carddto';
import { MessageService } from 'primeng/api';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

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

  showTopCenter() {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Sfida!', detail: 'Giocano tutti, niente tempo... Let\'s go!' });
  }

  curSec: number = 0;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 100;
  bufferValue = 100;
  dice: number | undefined;

  timer: number = 65;
  sub: Subscription | undefined;
  check: boolean = false;
  blur: boolean = false;

  categories: string[][] = [['P', 'yellow', 'Persone/Luoghi/Animali'], ['O', 'navy', 'Oggetti'], ['A', 'grey', 'Azioni'], ['?', 'green', 'Difficoltà'], ['S', 'red', 'Sfida']];

  cardToShow: CardToShow = new CardToShow();
  card: Card | undefined;
  cat: string = "";
  catShow: string = "";

  data: any[] =  [{"cat": "P", "num": 1, "par": "DISCARICA"}, {"cat": "O", "num": 1, "par": "TOGA"}, {"cat": "A", "num": 0, "par": "SOLCARE"}, {"cat": "?", "num": 0, "par": "PORTA ASCIUGAMANO"}, {"cat": "S", "num": 0, "par": "AURORA BOREALE"}, {"cat": "P", "num": 1, "par": "CAMPANILE"}, {"cat": "O", "num": 0, "par": "CARBONE"}, {"cat": "A", "num": 0, "par": "CICATRIZZARSI"}, {"cat": "?", "num": 1, "par": "LETTORE DEL PENSIERO"}, {"cat": "S", "num": 0, "par": "MORSO DI SERPENTE"}, {"cat": "P", "num": 1, "par": "DISCOTECA"}, {"cat": "O", "num": 0, "par": "MOCASSINO"}, {"cat": "A", "num": 1, "par": "SOLLEVARE"}, {"cat": "?", "num": 0, "par": "GAS ESILARANTE"}, {"cat": "S", "num": 0, "par": "TERZO"}, {"cat": "P", "num": 0, "par": "COCCODRILLO"}, {"cat": "O", "num": 1, "par": "DOPOSCI"}, {"cat": "A", "num": 0, "par": "SGOBBARE"}, {"cat": "?", "num": 1, "par": "ALVEARE"}, {"cat": "S", "num": 0, "par": "PROIETTORE"}, {"cat": "P", "num": 1, "par": "OSPEDALE"}, {"cat": "O", "num": 1, "par": "PERLA"}, {"cat": "A", "num": 0, "par": "TRAFORARE"}, {"cat": "?", "num": 0, "par": "SCENARIO"}, {"cat": "S", "num": 0, "par": "ACUTO"}, {"cat": "P", "num": 0, "par": "PESCE VOLANTE"}, {"cat": "O", "num": 1, "par": "GHIRLANDA"}, {"cat": "A", "num": 1, "par": "SFREGARE"}, {"cat": "?", "num": 
  0, "par": "FREDDO"}, {"cat": "S", "num": 0, "par": "IMBUTO"}, {"cat": "P", "num": 1, "par": "PITTORE"}, {"cat": "O", "num": 0, "par": "MEGAFONO"}, {"cat": "A", "num": 0, "par": "OLIARE"}, {"cat": "?", "num": 1, "par": "GELOSO"}, {"cat": "S", "num": 0, "par": "CUSCINO"}, {"cat": "P", "num": 0, "par": "LAS VEGAS"}, {"cat": "O", "num": 0, "par": "PALO DEL TELEGRAFO"}, {"cat": "A", "num": 1, "par": "PUBBLICARE"}, {"cat": "?", "num": 1, "par": "GIOVANE"}, {"cat": "S", "num": 0, "par": "TERREMOTO"}, {"cat": "P", "num": 1, "par": "SERPENTE"}, {"cat": "O", "num": 0, "par": "FINESTRA"}, {"cat": "A", "num": 0, "par": "CONTROLLARE"}, {"cat": "?", "num": 1, "par": "CAROSELLO"}, {"cat": "S", "num": 0, "par": "INUTILE"}, {"cat": "P", "num": 1, "par": "DOLOMITI"}, {"cat": "O", "num": 0, "par": "SCIALUPPA DI SALVATAGGIO"}, {"cat": "A", "num": 0, "par": "CHIACCHIERARE"}, {"cat": "?", "num": 1, "par": "PREFISSO INTERNAZIONALE"}, {"cat": "S", "num": 0, "par": "UNGHIA"}, {"cat": "P", "num": 1, "par": "ANTARTICO"}, {"cat": "O", "num": 1, "par": "GRONDAIA"}, {"cat": "A", "num": 0, "par": "GRIDARE"}, {"cat": "?", "num": 0, "par": "FISICO"}, {"cat": "S", "num": 0, "par": "MASCHERA DELL'OSSIGENO"}, {"cat": "P", "num": 0, "par": "GATTO SIAMESE"}, {"cat": "O", "num": 1, "par": "ARANCIO"}, {"cat": "A", "num": 1, "par": "SCOPPIARE"}, {"cat": "?", "num": 0, "par": "ORIENTALE"}, {"cat": "S", "num": 0, "par": "PREZZEMOLO"}, {"cat": "P", "num": 0, "par": "MANTIDE RELIGIOSA"}, {"cat": "O", "num": 0, "par": "CALCOLATRICE"}, {"cat": "A", "num": 1, "par": "AFFIGGERE"}, {"cat": "?", "num": 1, "par": "SCATTO"}, {"cat": "S", "num": 0, "par": "DOVE"}, {"cat": "P", "num": 1, "par": "CANINO"}, {"cat": "O", "num": 0, "par": "GAROFANO"}, {"cat": "A", "num": 1, "par": "DECOLLARE"}, {"cat": "?", "num": 0, "par": "STENDARDO"}, {"cat": "S", "num": 0, "par": "CURVA"}, {"cat": "P", "num": 1, "par": 
  "SPACCANAPOLI"}, {"cat": "O", "num": 0, "par": "VESTITI"}, {"cat": "A", "num": 0, "par": "ONDEGGIARE"}, {"cat": "?", "num": 1, "par": "CRESTA"}, {"cat": 
  "S", "num": 0, "par": "INTIMO"}, {"cat": "P", "num": 0, "par": "ALA"}, {"cat": "O", "num": 0, "par": "FREEZER"}, {"cat": "A", "num": 1, "par": "LAVARE IL CERVELLO"}, {"cat": "?", "num": 1, "par": "FOGLIA DI FICO"}, {"cat": "S", "num": 0, "par": "BIANCO"}, {"cat": "P", "num": 1, "par": "CONSERVATORE"}, {"cat": "O", "num": 0, "par": "CIBO"}, {"cat": "A", "num": 1, "par": "PARTECIPARE"}, {"cat": "?", "num": 0, "par": "CORSA A OSTACOLI"}, {"cat": "S", "num": 
  0, "par": "COSMONAUTA"}, {"cat": "P", "num": 1, "par": "FARAONE"}, {"cat": "O", "num": 0, "par": "TAGLIATELLE"}, {"cat": "A", "num": 1, "par": "RUSSARE"}, {"cat": "?", "num": 0, "par": "VEGLIARE"}, {"cat": "S", "num": 0, "par": "GARA DI SCI"}, {"cat": "P", "num": 1, "par": "ATTORE"}, {"cat": "O", "num": 0, "par": "ARACHIDE"}, {"cat": "A", "num": 0, "par": "ANNEGARE"}, {"cat": "?", "num": 1, "par": "MATTO"}, {"cat": "S", "num": 0, "par": "CAOS"}, {"cat": "P", "num": 1, "par": "MURATORE"}, {"cat": "O", "num": 0, "par": "SEDIA RECLINABILE"}, {"cat": "A", "num": 0, "par": "SECCARE"}, {"cat": "?", "num": 1, "par": "MILIARDO"}, {"cat": "S", "num": 0, "par": "LACCA"}, {"cat": "P", "num": 1, "par": "FORTE ALAMO"}, {"cat": "O", "num": 0, "par": "FRITTATA"}, {"cat": "A", "num": 1, "par": "VESTIRSI"}, {"cat": "?", "num": 0, "par": "STORIA"}, {"cat": "S", "num": 0, "par": "VENERE DI MILO"}, {"cat": "P", "num": 1, "par": "MAIALE"}, {"cat": "O", "num": 0, "par": "PUGNO DI FERRO"}, {"cat": "A", "num": 0, "par": "VINCERE"}, {"cat": "?", "num": 1, "par": "SQUASH"}, {"cat": "S", "num": 0, "par": "MEDICINA"}, {"cat": "P", "num": 1, "par": "ZANNA"}, {"cat": "O", "num": 0, "par": "CALZONI ALLA ZUAVA"}, {"cat": "A", "num": 0, "par": "SUPPORTARE"}, {"cat": "?", "num": 1, "par": "POMODORO"}, {"cat": "S", "num": 0, "par": "CHIARO DI LUNA"}, {"cat": "P", "num": 0, "par": "GALASSIA"}, {"cat": "O", "num": 1, "par": "MATERASSO"}, {"cat": "A", "num": 0, "par": "LUCIDARE"}, {"cat": "?", "num": 1, "par": "NATALE"}, {"cat": "S", "num": 0, "par": "NOTTE"}, {"cat": "P", "num": 1, "par": "SOGLIOLA"}, {"cat": "O", "num": 0, "par": "BICICLETTA"}, {"cat": "A", "num": 0, "par": "FERMENTARE"}, {"cat": "?", "num": 1, "par": "LIMITE DI VELOCITA'"}, {"cat": "S", "num": 0, "par": "PROFONDO"}, {"cat": "P", "num": 1, "par": "AMERICA"}, {"cat": "O", "num": 0, "par": "TAPPETO"}, {"cat": "A", "num": 1, "par": "GENERARE"}, {"cat": "?", "num": 0, "par": "RALLENTATORE"}, {"cat": "S", "num": 0, "par": "MAMMELLATA"}, {"cat": "P", "num": 0, "par": "RIFUGIO ANTIAEREO"}, {"cat": "O", "num": 1, "par": "ELICOTTERO"}, {"cat": "A", "num": 1, "par": "TENTENNARE"}, {"cat": 
  "?", "num": 0, "par": "RABBIA"}, {"cat": "S", "num": 0, "par": "AUTOSTRADA"}, {"cat": "P", "num": 0, "par": "AMERICA DEL NORD"}, {"cat": "O", "num": 0, "par": "PICCHE"}, {"cat": "A", "num": 1, "par": "PROIBIRE"}, {"cat": "?", "num": 1, "par": "NERVO"}, {"cat": "S", "num": 0, "par": "RANNUVOLARSI"}, {"cat": "P", "num": 0, "par": "PALERMO"}, {"cat": "O", "num": 1, "par": "POP CORN"}, {"cat": "A", "num": 0, "par": "POMPARE"}, {"cat": "?", "num": 1, "par": "ATTACCARE BOTTONE"}, {"cat": "S", "num": 0, "par": "TAPPO DI SUGHERO"}, {"cat": "P", "num": 0, "par": "PORTAMAZZE"}, {"cat": "O", "num": 1, "par": "TRAMPOLI"}, {"cat": "A", "num": 0, "par": "CONTARE"}, {"cat": "?", "num": 1, "par": "CAPITALE"}, {"cat": "S", "num": 0, "par": "CAVO ORALE"}, {"cat": "P", "num": 0, "par": "DISCENDENTE"}, {"cat": "O", "num": 1, "par": "CANNA FUMARIA"}, {"cat": "A", "num": 0, "par": "IMBALLARE"}, {"cat": "?", "num": 1, "par": "NUOVO"}, {"cat": "S", "num": 0, "par": "MASCARA"}, {"cat": "P", "num": 1, "par": "CIMITERO"}, {"cat": "O", "num": 0, "par": "JET"}, {"cat": "A", "num": 1, "par": "LAVARSI I CAPELLI"}, {"cat": "?", "num": 0, "par": "PIGRO"}, {"cat": "S", "num": 0, "par": "FANGO"}, {"cat": "P", "num": 0, "par": "STREGONE"}, {"cat": "O", "num": 1, "par": "BOA"}, {"cat": "A", "num": 1, "par": "AVVOLGERE"}, {"cat": "?", "num": 0, "par": "CAPELLI RICCI"}, {"cat": "S", "num": 
  0, "par": "\nSCRITTURA BRAILLE"}, {"cat": "P", "num": 0, "par": "BLOCK NOTES"}, {"cat": "O", "num": 1, "par": "STRIMPELLARE"}, {"cat": "A", "num": 1, "par": "POLIESTERE"}, {"cat": "?", "num": 0, "par": "SGABELLO DA BAR"}, {"cat": "S", "num": 0, "par": "NULL"}, {"cat": "P", "num": 0, "par": "SEMINTERRATO"}, 
  {"cat": "O", "num": 1, "par": "ALBERO DELLA NAVE"}, {"cat": "A", "num": 1, "par": "INGRANDIRE"}, {"cat": "?", "num": 0, "par": "SCAFFALATURA"}, {"cat": "S", "num": 0, "par": "ORECCHINO"}, {"cat": "P", "num": 0, "par": "POSTINO"}, {"cat": "O", "num": 1, "par": "TROMBONE"}, {"cat": "A", "num": 1, "par": "CUCIRE"}, {"cat": "?", "num": 0, "par": "COSTATA"}, {"cat": "S", "num": 0, "par": "TUFFO DI TESTA"}, {"cat": "P", "num": 0, "par": "TAVOLIERE DELLE PUGLIE"}, 
  {"cat": "O", "num": 1, "par": "COLLARE"}, {"cat": "A", "num": 0, "par": "CORRODERE"}, {"cat": "?", "num": 1, "par": "FORBICINA"}, {"cat": "S", "num": 0, "par": "PETROLIO"}, {"cat": "P", "num": 1, "par": "PETTIROSSO"}, {"cat": "O", "num": 1, "par": "ZAMPIRONE"}, {"cat": "A", "num": 0, "par": "CANDEGGIARE"}, {"cat": "?", "num": 0, "par": "COLON"}, {"cat": "S", "num": 0, "par": "STRISCIA"}, {"cat": "P", "num": 1, "par": "INGRESSO"}, {"cat": "O", "num": 0, "par": "CACCIAVITE"}, {"cat": "A", "num": 0, "par": "PESCARE"}, {"cat": "?", "num": 1, "par": "SONNELLINO"}, {"cat": "S", "num": 0, "par": "VULCANO"}, {"cat": "P", "num": 1, "par": "MUCCA"}, {"cat": "O", "num": 0, "par": "MANUBRIO"}, {"cat": "A", "num": 1, "par": "VENDICARE"}, {"cat": "?", "num": 0, "par": "PNEUMATICO RADIALE"}, {"cat": "S", "num": 0, "par": "LUCE DI CANDELA"}, {"cat": "P", "num": 1, "par": "OSTRICA"}, {"cat": "O", "num": 1, "par": "CAVALLO DA CORSA"}, {"cat": "A", "num": 0, "par": "SCHIZZARE"}, {"cat": "?", "num": 0, "par": "VITA"}, {"cat": "S", "num": 0, "par": "FILTRO PER OBIETTIVO"}, {"cat": 
  "P", "num": 0, "par": "BOYSCOUT"}, {"cat": "O", "num": 1, "par": "MANICHINO"}, {"cat": "A", "num": 0, "par": "DOMARE"}, {"cat": "?", "num": 1, "par": "LUNEDI'"}, {"cat": "S", "num": 0, "par": "SECONDA MANO"}, {"cat": "P", "num": 0, "par": "SAINT TROPEZ"}, {"cat": "O", "num": 1, "par": "PASTICCIO"}, {"cat": "A", "num": 1, "par": "CALCIARE"}, {"cat": "?", "num": 0, "par": "PIEDI PIATTI"}, {"cat": "S", "num": 0, "par": "DESIGNER"}, {"cat": "P", "num": 1, "par": "PALUDE"}, {"cat": "O", "num": 0, "par": "INCROCIO"}, {"cat": "A", "num": 0, "par": "VERIFICARE"}, {"cat": "?", "num": 1, "par": "RIPIANO"}, {"cat": 
  "S", "num": 0, "par": "TRONCO"}, {"cat": "P", "num": 0, "par": "DONNA BAFFUTA"}, {"cat": "O", "num": 0, "par": "PIANOFORTE"}, {"cat": "A", "num": 1, "par": "INZUPPARE"}, {"cat": "?", "num": 1, "par": "LINEA LATERALE"}, {"cat": "S", "num": 0, "par": "SMOG"}, {"cat": "P", "num": 0, "par": "COTTAGE"}, {"cat": "O", "num": 0, "par": "PRUGNA"}, {"cat": "A", "num": 1, "par": "STRILLARE"}, {"cat": "?", "num": 1, "par": "PRINCIPALE"}, {"cat": "S", "num": 0, "par": "VALLETTA"}, {"cat": "P", "num": 1, "par": "ISRAELE"}, {"cat": "O", "num": 0, "par": "ANGURIA"}, {"cat": "A", "num": 0, "par": "CALCOLARE"}, {"cat": 
  "?", "num": 1, "par": "SPETTRO"}, {"cat": "S", "num": 0, "par": "MENTE"}, {"cat": "P", "num": 0, "par": "MUSCOLO"}, {"cat": "O", "num": 1, "par": "VESTIARIO"}, {"cat": "A", "num": 1, "par": "IMPASTARE"}, {"cat": "?", "num": 0, "par": "PASSEGGIATA NELLO SPAZIO"}, {"cat": "S", "num": 0, "par": "ILLUSIONE"}, {"cat": "P", "num": 0, "par": "TARTARUGA"}, {"cat": "O", "num": 1, "par": "GRANATA"}, {"cat": "A", "num": 0, "par": "SCORRERE"}, {"cat": "?", "num": 1, 
  "par": "RUGGINE"}, {"cat": "S", "num": 0, "par": "SPILLA DA BALIA"}, {"cat": "P", "num": 1, "par": "PUMA"}, {"cat": "O", "num": 1, "par": "ALBERO DI NATALE"}, {"cat": "A", "num": 0, "par": "FARE LA MANICURE"}, {"cat": "?", "num": 0, "par": "PLOTONE D'ESECUZIONE"}, {"cat": "S", "num": 0, "par": "CONTAGIOSO"}, {"cat": "P", "num": 0, "par": "CASCATE DEL NIAGARA"}, {"cat": "O", "num": 1, "par": "PORTAFOGLIO"}, {"cat": "A", "num": 1, "par": "CUOCERE"}, {"cat": "?", "num": 0, "par": "CONCRETO"}, {"cat": "S", "num": 0, "par": "GORILLA"}, {"cat": "P", "num": 0, "par": "GABINETTO"}, {"cat": "O", "num": 0, "par": "PIEDISTALLO"}, {"cat": "A", "num": 1, "par": "SCOMPARIRE"}, {"cat": "?", "num": 1, "par": "MORTIFICATO"}, {"cat": "S", "num": 0, "par": "PAVIMENTAZIONE"}, {"cat": "P", "num": 1, "par": "GUARDAROBA"}, {"cat": "O", "num": 0, "par": "LAMPEGGIATORE"}, {"cat": "A", "num": 0, "par": "EVITARE"}, {"cat": "?", "num": 1, "par": "STRETTO"}, {"cat": "S", "num": 0, "par": "BABBO NATALE"}, {"cat": "P", "num": 1, "par": "CAVIGLIA"}, {"cat": "O", "num": 1, "par": "UOVO"}, {"cat": "A", "num": 0, "par": "VEDERE"}, {"cat": "?", "num": 0, "par": "INCENDIO DOLOSO"}, {"cat": "S", "num": 0, "par": "SENSO UNICO"}, {"cat": "P", "num": 0, "par": "NONNO"}, {"cat": "O", "num": 1, "par": "CUCCHIAINO"}, {"cat": "A", "num": 0, "par": "SPECULARE"}, {"cat": "?", "num": 1, "par": "FILA INDIANA"}, {"cat": "S", "num": 0, "par": "FUOCO"}, {"cat": "P", "num": 1, "par": "SOTTOSUOLO"}, {"cat": "O", "num": 0, "par": "GIARRETTIERA"}, {"cat": "A", "num": 1, "par": "IMBACUCCARE"}, {"cat": "?", "num": 0, "par": "BOSCAIOLO"}, {"cat": "S", "num": 0, "par": "CIECO"}, {"cat": "P", "num": 1, "par": "BOCCA"}, {"cat": "O", "num": 0, "par": "PASSERELLA"}, {"cat": "A", "num": 0, "par": "INARCARE"}, {"cat": "?", "num": 1, "par": "CALMO"}, {"cat": "S", "num": 0, "par": "MARKETING"}, {"cat": "P", "num": 0, "par": "RISTORANTE"}, {"cat": "O", "num": 1, "par": "CUBETTO DI GHIACCIO"}, {"cat": "A", "num": 1, "par": "SONNECCHIARE"}, {"cat": "?", "num": 0, "par": "POKER"}, {"cat": "S", "num": 0, "par": "IMBUTO"}, {"cat": "P", "num": 0, "par": "CAPELLI"}, {"cat": "O", "num": 0, "par": "SEGA"}, {"cat": "A", "num": 1, "par": "RINVIARE"}, {"cat": "?", "num": 1, "par": "DIAPASON"}, {"cat": "S", "num": 0, "par": "STELLA CADENTE"}, {"cat": "P", "num": 0, "par": "EST"}, {"cat": "O", "num": 0, "par": "FUCILE"}, {"cat": "A", "num": 1, "par": "SALDARE"}, {"cat": "?", "num": 1, "par": 
  "SUCCO"}, {"cat": "S", "num": 0, "par": "MORBILLO"}, {"cat": "P", "num": 0, "par": "SANBERNARDO"}, {"cat": "O", "num": 0, "par": "SCUDO"}, {"cat": "A", "num": 1, "par": "FARE"}, {"cat": "?", "num": 1, "par": "POEMA"}, {"cat": "S", "num": 0, "par": "TINTINNARE"}, {"cat": "P", "num": 0, "par": "PANDA"}, 
  {"cat": "O", "num": 1, "par": "OCCHIALI DA SOLE"}, {"cat": "A", "num": 1, "par": "ASCIUGARE"}, {"cat": "?", "num": 0, "par": "SVANTAGGIO"}, {"cat": "S", "num": 0, "par": "REMO"}, {"cat": "P", "num": 1, "par": "CASA GALLEGGIANTE"}, {"cat": "O", "num": 0, "par": "SASSOFONO"}, {"cat": "A", "num": 0, "par": "INGIURIARE"}, {"cat": "?", "num": 1, "par": "PARAGRAFO"}, {"cat": "S", "num": 0, "par": "CARRO ARMATO"}, {"cat": "P", "num": 0, "par": "CAPRA"}, {"cat": 
  "O", "num": 0, "par": "RAGGI DELLA RUOTA"}, {"cat": "A", "num": 1, "par": "BAGNARE"}, {"cat": "?", "num": 1, "par": "TAPPI PER LE ORECCHIE"}, {"cat": "S", "num": 0, "par": "DRAGO"}, {"cat": "P", "num": 0, "par": "SIGNORA"}, {"cat": "O", "num": 1, "par": "VIOLINO"}, {"cat": "A", "num": 1, "par": "INVADERE"}, 
  {"cat": "?", "num": 0, "par": "GRUPPO"}, {"cat": "S", "num": 0, "par": "NONNA"}, {"cat": "P", "num": 0, "par": "CHIRURGO"}, {"cat": "O", "num": 1, "par": "INSEGNA"}, {"cat": "A", "num": 0, "par": "PICCHETTARE"}, {"cat": "?", "num": 1, "par": "GERMOGLIO"}, {"cat": "S", "num": 0, "par": "SPACCATA"}, {"cat": "P", "num": 0, "par": "CAVALLO"}, {"cat": "O", "num": 0, "par": "CALZA"}, {"cat": "A", "num": 1, "par": "SCALPELLARE"}, {"cat": "?", "num": 1, "par": "INFLAZIONE"}, {"cat": "S", "num": 0, "par": "OMBRA"}, {"cat": "P", "num": 0, "par": "DENTE"}, {"cat": "O", "num": 1, "par": "FIONDA"}, {"cat": "A", "num": 0, "par": "VARARE"}, {"cat": "?", "num": 1, "par": "SPATOLA"}, {"cat": "S", "num": 0, "par": "CORTEO"}, {"cat": "P", "num": 0, "par": "PIANO INFERIORE"}, {"cat": "O", "num": 0, "par": "PIEDE DI PORCO"}, {"cat": "A", "num": 1, "par": "FRATTURARE"}, {"cat": "?", "num": 1, "par": "MEDIA"}, {"cat": "S", "num": 0, "par": "PAPILLON"}, {"cat": "P", "num": 1, "par": "TOKYO"}, {"cat": "O", "num": 0, "par": "GRATTUGGIA PER FORMAGGIO"}, {"cat": "A", "num": 1, "par": "RADERE AL SUOLO"}, {"cat": "?", "num": 0, "par": "TEST"}, {"cat": "S", "num": 0, "par": "PICTIONARY"}, {"cat": "P", "num": 0, "par": "AFRICA"}, 
  {"cat": "O", "num": 0, "par": "SPECCHIO"}, {"cat": "A", "num": 1, "par": "TOCCARE"}, {"cat": "?", "num": 1, "par": "SOPRA"}, {"cat": "S", "num": 0, "par": "ALGA"}, {"cat": "P", "num": 1, "par": "PARASSITA"}, {"cat": "O", "num": 0, "par": "CASSETTA DEGLI ATTREZZI"}, {"cat": "A", "num": 0, "par": "ALTERNARE"}, {"cat": "?", "num": 1, "par": "TIZZONE"}, {"cat": "S", "num": 0, "par": "PREMIO"}, {"cat": "P", "num": 1, "par": "SALA DA GIOCO"}, {"cat": "O", "num": 1, "par": "STIVALI"}, {"cat": "A", "num": 0, "par": "RUZZOLARE"}, {"cat": "?", "num": 0, "par": "BRETELLA"}, {"cat": "S", "num": 0, "par": "SCIARADA"}, {"cat": 
  "P", "num": 0, "par": "CESTA DEL CANE"}, {"cat": "O", "num": 0, "par": "SPORTELLO"}, {"cat": "A", "num": 1, "par": "STRAPPARE"}, {"cat": "?", "num": 1, "par": "FIASCO"}, {"cat": "S", "num": 0, "par": "CIRCONDARE"}, {"cat": "P", "num": 1, "par": "CIVETTA"}, {"cat": "O", "num": 0, "par": "TRATTORE"}, {"cat": "A", "num": 1, "par": "RICALCARE"}, {"cat": "?", "num": 0, "par": "BESSELLER"}, {"cat": "S", "num": 0, "par": "POZZANGHERA"}, {"cat": "P", "num": 0, "par": "PIOVRA"}, {"cat": "O", "num": 1, "par": "PETALO"}, {"cat": "A", "num": 1, "par": "SENTIRE"}, {"cat": "?", "num": 0, "par": "PORO"}, {"cat": "S", "num": 0, "par": "FONDUTA"}, {"cat": "P", "num": 1, "par": "VIALE"}, {"cat": "O", "num": 1, "par": "MOBILE"}, {"cat": "A", "num": 0, "par": "ESAMINARE"}, {"cat": "?", "num": 0, "par": "RICHIAMO DELLA FORESTA"}, {"cat": "S", "num": 0, "par": "DONNA"}, {"cat": "P", "num": 1, "par": "TASSO"}, {"cat": "O", "num": 0, "par": "FOCACCINA"}, {"cat": "A", "num": 0, "par": "COPIARE"}, {"cat": "?", "num": 1, "par": "SEDIA ELETTRICA"}, {"cat": "S", "num": 0, "par": "TIMIDO"}, {"cat": "P", "num": 1, "par": "CALAMARO"}, {"cat": "O", "num": 0, "par": "RAGGIO LASER"}, {"cat": "A", "num": 0, "par": "DISERBARE"}, {"cat": "?", "num": 1, "par": "MOLTIPLICARE"}, {"cat": "S", "num": 0, "par": "WINDSURF"}, {"cat": "P", "num": 1, "par": "BRACCIDFERRO"}, {"cat": "O", "num": 0, "par": "STRINGA"}, {"cat": "A", "num": 1, "par": "ADATTARE"}, {"cat": "?", "num": 0, "par": "GIOVEDI'"}, {"cat": "S", "num": 0, "par": "TAGLIO DI CAPELLI"}, {"cat": "P", "num": 1, "par": "CRANIO"}, {"cat": "O", "num": 0, "par": "OBIETTIVO"}, {"cat": "A", "num": 1, "par": "ARCHIVIARE"}, {"cat": "?", "num": 0, "par": "PRESCRIZIONE"}, {"cat": "S", "num": 0, "par": "RUOTA DEL CARRO"}, {"cat": "P", "num": 0, "par": "ROMA"}, {"cat": "O", "num": 1, "par": "SEDIA"}, {"cat": "A", "num": 1, "par": "FERMARE"}, {"cat": "?", "num": 0, "par": "BIBITA ANALCOLICA"}, {"cat": "S", "num": 0, "par": "NUVOLOSO"}, {"cat": "P", "num": 1, "par": "PIANURA PADANA"}, {"cat": "O", "num": 1, "par": "DOLLARO"}, {"cat": "A", "num": 0, "par": "SGOCCIOLARE"}, {"cat": "?", "num": 0, "par": 
  "ASSAGGIO"}, {"cat": "S", "num": 0, "par": "POSITIVO"}, {"cat": "P", "num": 1, "par": "SQUALO"}, {"cat": "O", "num": 0, "par": "PALLOTTOLIERE"}, {"cat": 
  "A", "num": 0, "par": "BUTTARE"}, {"cat": "?", "num": 1, "par": "CALDAIA"}, {"cat": "S", "num": 0, "par": "SOTTOMARINO"}, {"cat": "P", "num": 1, "par": "GEMELLI SIAMESI"}, {"cat": "O", "num": 0, "par": "RISMA"}, {"cat": "A", "num": 1, "par": "NUMERARE"}, {"cat": "?", "num": 0, "par": "MARTEDI' GRASSO"}, {"cat": "S", "num": 0, "par": "BRIDGE"}, {"cat": "P", "num": 1, "par": "RANCH"}, {"cat": "O", "num": 1, "par": "RISVOLTO DELLA GIACCA"}, {"cat": "A", "num": 
  0, "par": "ARRICCIARE"}, {"cat": "?", "num": 0, "par": "STRANIERO"}, {"cat": "S", "num": 0, "par": "FERMAPORTA"}, {"cat": "P", "num": 1, "par": "STAZIONE SPAZIALE"}, {"cat": "O", "num": 0, "par": "MONOROTAIA"}, {"cat": "A", "num": 0, "par": "INTAGLIARE"}, {"cat": "?", "num": 1, "par": "CUCITRICE"}, {"cat": "S", "num": 0, "par": "PI\u00d1COLADA"}, {"cat": "P", "num": 0, "par": "MEDIO ORIENTE"}, {"cat": "O", "num": 1, "par": "PETARDO"}, {"cat": "A", "num": 0, "par": "VIAGGIARE"}, {"cat": "?", "num": 1, "par": "SALUTE"}, {"cat": "S", "num": 0, "par": "MANDRAKE"}, {"cat": "P", "num": 1, "par": "PAESE"}, {"cat": "O", "num": 1, "par": "HAMBURGER"}, {"cat": "A", "num": 0, "par": "INGHIOTTIRE"}, {"cat": "?", "num": 0, "par": "VALLE DELLA MORTE"}, {"cat": "S", 
  "num": 0, "par": "LARINGITE"}, {"cat": "P", "num": 1, "par": "PLUTONE"}, {"cat": "O", "num": 0, "par": "RUBINETTO"}, {"cat": "A", "num": 1, "par": "DIRIGERE"}, {"cat": "?", "num": 0, "par": "IMPORTAZIONE"}, {"cat": "S", "num": 0, "par": "CAMINETTO"}, {"cat": "P", "num": 1, "par": "ORNITORINCO"}, {"cat": "O", "num": 0, "par": "MONOCICLO"}, {"cat": "A", "num": 1, "par": "CUCINARE"}, {"cat": "?", "num": 0, "par": "MULA"}, {"cat": "S", "num": 0, "par": "POLO"}, {"cat": "P", "num": 1, "par": "CAPOBANDA"}, {"cat": "O", "num": 1, "par": "ARCA DI NOE'"}, {"cat": "A", "num": 0, "par": "SPIARE"}, {"cat": "?", "num": 0, "par": 
  "MUSICA"}, {"cat": "S", "num": 0, "par": "POVERO"}, {"cat": "P", "num": 0, "par": "INGHILTERRA"}, {"cat": "O", "num": 1, "par": "MELA"}, {"cat": "A", "num": 0, "par": "INALARE"}, {"cat": "?", "num": 1, "par": "PASSATO"}, {"cat": "S", "num": 0, "par": "CORPETTO"}, {"cat": "P", "num": 0, "par": "MICIO"}, {"cat": "O", "num": 1, "par": "BILANCERE"}, {"cat": "A", "num": 1, "par": "AGITARSI"}, {"cat": "?", "num": 0, "par": "RIPARATORE"}, {"cat": "S", "num": 0, 
  "par": "OCCHIO DI BUE"}, {"cat": "P", "num": 0, "par": "CANE SELVATICO"}, {"cat": "O", "num": 1, "par": "MATTONE"}, {"cat": "A", "num": 1, "par": "RINGHIARE"}, {"cat": "?", "num": 0, "par": "TESTA D'ALCE"}, {"cat": "S", "num": 0, "par": "CONCHIGLIA"}, {"cat": "P", "num": 1, "par": "STAZIONE DEGLI AUTOBUS"}, 
  {"cat": "O", "num": 0, "par": "STATUA"}, {"cat": "A", "num": 1, "par": "SOGNARE"}, {"cat": "?", "num": 0, "par": "CONVESSO"}, {"cat": "S", "num": 0, "par": "STRUMENTO"}, {"cat": "P", "num": 0, "par": "QUADRUPEDE"}, {"cat": "O", "num": 0, "par": "BUSTA"}, {"cat": "A", "num": 1, "par": "SURRISCALDARE"}, 
  {"cat": "?", "num": 1, "par": "QUATTROCCHI"}, {"cat": "S", "num": 0, "par": "COMA"}, {"cat": "P", "num": 1, "par": "PSICHIATRA"}, {"cat": "O", "num": 0, 
  "par": "SOMBRERO"}, {"cat": "A", "num": 1, "par": "STAMPARE"}, {"cat": "?", "num": 0, "par": "CARTA"}, {"cat": "S", "num": 0, "par": "PUNTURA"}, {"cat": 
  "P", "num": 0, "par": "GUFO REALE"}, {"cat": "O", "num": 1, "par": "PERISCOPIO"}, {"cat": "A", "num": 1, "par": "VOTARE"}, {"cat": "?", "num": 0, "par": 
  "INDICAZIONE"}, {"cat": "S", "num": 0, "par": "PORCOSPINO"}, {"cat": "P", "num": 1, "par": "CLAUDIO BAGLIONI"}, {"cat": "O", "num": 0, "par": "PASTINA"}, {"cat": "A", "num": 1, "par": "IMBRATTARE"}, {"cat": "?", "num": 0, "par": "FOCHERELLO"}, {"cat": "S", "num": 0, "par": "NORDEST"}, {"cat": "P", "num": 
  1, "par": "GERUSALEMME"}, {"cat": "O", "num": 1, "par": "METEORA"}, {"cat": "A", "num": 0, "par": "RALLEGRARE"}, {"cat": "?", "num": 0, "par": "SQUADRA"}, {"cat": "S", "num": 0, "par": "CINTURA NERA"}, {"cat": "P", "num": 1, "par": "CAVALIERE"}, {"cat": "O", "num": 1, "par": "URNA"}, {"cat": "A", "num": 0, "par": "FORGIARE"}, {"cat": "?", "num": 0, "par": "LATERALMENTE"}, {"cat": "S", "num": 0, "par": "CORSA DI SLITTE"}, {"cat": "P", "num": 1, "par": "CATTEDRALE"}, {"cat": "O", "num": 0, "par": "CORAZZA"}, {"cat": "A", "num": 0, "par": "DEDICARE"}, {"cat": "?", "num": 1, "par": "TONNELLATA"}, {"cat": "S", "num": 0, "par": "OVALE"}, {"cat": "P", "num": 0, "par": "CILE"}, {"cat": "O", "num": 1, "par": "BAMBOLA"}, {"cat": "A", "num": 0, "par": "SPANDERE"}, {"cat": "?", "num": 1, "par": "PALCOSCENICO"}, {"cat": "S", "num": 0, "par": "CANZONE"}, {"cat": "P", "num": 0, "par": "GIUSEPPE GARIBALDI"}, {"cat": "O", "num": 1, "par": "TUTU'"}, {"cat": "A", "num": 1, "par": "CHIUDERE A CHIAVE"}, {"cat": "?", "num": 0, "par": "SALSA"}, {"cat": "S", "num": 0, "par": 
  "GIRADISCHI"}, {"cat": "P", "num": 1, "par": "BALENA"}, {"cat": "O", "num": 1, "par": "CINTURA"}, {"cat": "A", "num": 0, "par": "APPASSIRE"}, {"cat": "?", "num": 0, "par": "PRANZO"}, {"cat": "S", "num": 0, "par": "TERMOMETRO"}, {"cat": "P", "num": 1, "par": "SCUOLA"}, {"cat": "O", "num": 0, "par": "FORNO"}, {"cat": "A", "num": 1, "par": "SLOGARSI"}, {"cat": "?", "num": 0, "par": "COMMOZIONE CEREBRALE"}, {"cat": "S", "num": 0, "par": "FANTASMA"}, {"cat": "P", "num": 1, "par": "CASSIUS CLAY"}, {"cat": "O", "num": 1, "par": "ELMO"}, {"cat": "A", "num": 1, "par": "STREGARE"}, {"cat": "?", "num": 0, "par": "\u03a4\u039f\u039d\u039f"}, {"cat": "S", "num": 0, "par": "VIRGOLETTE"}, {"cat": "P", "num": 0, "par": "VILLAGGIO"}, {"cat": "O", "num": 1, "par": "FERITOIA"}, {"cat": "A", "num": 1, "par": "GIRARE UN FILM"}, {"cat": "?", "num": 0, "par": "ACQUA BOLLENTE"}, {"cat": "S", "num": 0, "par": "PULCE"}, {"cat": "P", "num": 0, "par": "MOLARE"}, {"cat": "O", "num": 1, "par": "SVEGLIA"}, {"cat": "A", "num": 1, "par": "VERSARE"}, {"cat": "?", "num": 0, "par": "POLPETTA"}, {"cat": "S", "num": 0, "par": "BICCHIERE DI VINO"}, {"cat": "P", "num": 0, "par": "TOPO"}, {"cat": "O", "num": 0, "par": "BIGLIETTO"}, {"cat": "A", "num": 1, "par": "ERUTTARE"}, {"cat": "?", "num": 1, "par": "PRIMA GUERRA MONDIALE"}, {"cat": "S", "num": 0, "par": "VISIERA"}, {"cat": "P", "num": 0, "par": "AMAZZONE"}, {"cat": "O", "num": 0, "par": "SCIARPA"}, {"cat": "A", "num": 1, "par": "AVVELENARE"}, {"cat": "?", "num": 1, "par": "PAROLA"}, {"cat": "S", "num": 0, "par": "PARCHIMETRO"}, {"cat": "P", "num": 0, "par": "TORRE"}, {"cat": "O", "num": 0, "par": "PALLINA DA CRICKET"}, {"cat": "A", "num": 1, "par": "CHIEDERE"}, {"cat": "?", "num": 1, "par": "VENTOSO"}, {"cat": "S", "num": 0, "par": "TITANIC"}, {"cat": "P", "num": 1, "par": "SATURNO"}, {"cat": "O", "num": 0, "par": "SALTINMENTE"}, {"cat": "A", "num": 0, "par": "PRENDERE"}, {"cat": "?", "num": 1, "par": "TITAP"}, {"cat": "S", "num": 0, "par": "CORROSIONE"}, {"cat": "P", "num": 1, "par": "UNIVERSITA'"}, {"cat": "O", "num": 0, "par": "COLLANA"}, {"cat": "A", "num": 1, "par": "COGLIERE"}, {"cat": "?", "num": 
  0, "par": "ZOPPO"}, {"cat": "S", "num": 0, "par": "NUVOLA"}, {"cat": "P", "num": 1, "par": "AL PACINO"}, {"cat": "O", "num": 1, "par": "RAGGI X"}, {"cat": "A", "num": 0, "par": "DIVORZIARE"}, {"cat": "?", "num": 0, "par": "CHIOSCO"}, {"cat": "S", "num": 0, "par": "NASTRO ADESIVO"}, {"cat": "P", "num": 
  1, "par": "SUD"}, {"cat": "O", "num": 0, "par": "FRIGORIFERO"}, {"cat": "A", "num": 0, "par": "GRACCHIARE"}, {"cat": "?", "num": 1, "par": "BUNKER"}, {"cat": "S", "num": 0, "par": "IDROREPELLENTE"}, {"cat": "P", "num": 1, "par": "ORFANO"}, {"cat": "O", "num": 0, "par": "PRESERVATIVO"}, {"cat": "A", "num": 1, "par": "DECAPITARE"}, {"cat": "?", "num": 0, "par": "VENERDI'"}, {"cat": "S", "num": 0, "par": "PONTE LEVATOIO"}, {"cat": "P", "num": 1, "par": "RIVIERA"}, {"cat": "O", "num": 0, "par": "RULLO TRASPORTATORE"}, {"cat": "A", "num": 1, "par": "SURGELARE"}, {"cat": "?", "num": 0, "par": "CONVERSAZIONE"}, 
  {"cat": "S", "num": 0, "par": "RECINTO"}, {"cat": "P", "num": 0, "par": "FORESTA NERA"}, {"cat": "O", "num": 1, "par": "VETRO"}, {"cat": "A", "num": 1, "par": "RICORDARE"}, {"cat": "?", "num": 0, "par": "GIOIELLO"}, {"cat": "S", "num": 0, "par": "RAGGIO"}, {"cat": "P", "num": 0, "par": "RONALD REAGAN"}, {"cat": "O", "num": 1, "par": "CANDELABRO"}, {"cat": "A", "num": 1, "par": "INVENTARE"}, {"cat": "?", "num": 0, "par": "BRIOCHE"}, {"cat": "S", "num": 0, "par": "MARTE"}, {"cat": "P", "num": 0, "par": "TIGRE"}, {"cat": "O", "num": 1, "par": "TRECCIA"}, {"cat": "A", "num": 1, "par": "DUELLARE"}, {"cat": "?", "num": 0, "par": "PASSEPARTOUT"}, {"cat": "S", "num": 0, "par": "SCARPONI"}, {"cat": "P", "num": 0, "par": "ITALIA"}, {"cat": "O", "num": 1, "par": 
  "PIANTA"}, {"cat": "A", "num": 0, "par": "MACIULLARE"}, {"cat": "?", "num": 1, "par": "BIBBIA"}, {"cat": "S", "num": 0, "par": "DESERTO DEL SAHARA"}, {"cat": "P", "num": 0, "par": "SARDO"}, {"cat": "O", "num": 1, "par": "CERNIERA LAMPO"}, {"cat": "A", "num": 1, "par": "SBUFFARE"}, {"cat": "?", "num": 0, "par": "PANIFICIO"}, {"cat": "S", "num": 0, "par": "PASSO CARRABILE"}, {"cat": "P", "num": 1, "par": "VESPA"}, {"cat": "O", "num": 0, "par": "FORMAGGIO SVIZZERO"}, {"cat": "A", "num": 1, "par": "DOLCIFICARE"}, {"cat": "?", "num": 0, "par": "APPLICAZIONE"}, {"cat": "S", "num": 0, "par": "GUIDA"}, {"cat": "P", "num": 0, "par": "GIRINO"}, {"cat": "O", "num": 1, "par": "TRAPPOLA PER TOPI"}, {"cat": "A", "num": 0, "par": "COMPLETARE"}, {"cat": "?", "num": 1, "par": "VANITOSO"}, {"cat": "S", "num": 0, "par": "NOVE"}, {"cat": "P", "num": 1, "par": "PESCE GATTO"}, {"cat": "O", "num": 0, "par": "STECCATO"}, {"cat": "A", "num": 0, "par": "AVVICINARE"}, {"cat": "?", "num": 1, "par": "PAROLA D'ORDINE"}, {"cat": "S", "num": 0, "par": "STAMPELLA"}, {"cat": "P", "num": 1, "par": 
  "UFFICIO"}, {"cat": "O", "num": 1, "par": "ORECCHINO CON DIAMANTE"}, {"cat": "A", "num": 0, "par": "ANSIMARE"}, {"cat": "?", "num": 0, "par": "ENORME"}, 
  {"cat": "S", "num": 0, "par": "JUVENTUS"}, {"cat": "P", "num": 0, "par": "LOANGELES"}, {"cat": "O", "num": 1, "par": "PARRUCCHINO"}, {"cat": "A", "num": 
  0, "par": "SRADICARE"}, {"cat": "?", "num": 1, "par": "CAPSULA"}, {"cat": "S", "num": 0, "par": "MARADONA"}, {"cat": "P", "num": 0, "par": "MILLEPIEDI"}, {"cat": "O", "num": 1, "par": "PARAORECCHIE"}, {"cat": "A", "num": 1, "par": "AMPUTARE"}, {"cat": "?", "num": 0, "par": "REPORTER"}, {"cat": "S", "num": 0, "par": "MARMITTA"}, {"cat": "P", "num": 0, "par": "UNGHIA DEL PIEDE"}, {"cat": "O", "num": 1, "par": "TORCIA ELETTRICA"}, {"cat": "A", "num": 1, "par": "IRRIGARE"}, {"cat": "?", "num": 0, "par": "COLLO DI BOTTIGLIA"}, {"cat": "S", "num": 0, "par": "CAPO"}, {"cat": "P", "num": 1, "par": "GLADIATORE"}, 
  {"cat": "O", "num": 0, "par": "BULLDOZER"}, {"cat": "A", "num": 1, "par": "IMBROGLIARE"}, {"cat": "?", "num": 0, "par": "FONDATO"}, {"cat": "S", "num": 0, "par": "IDEA"}, {"cat": "P", "num": 0, "par": "RUSSIA"}, {"cat": "O", "num": 1, "par": "BENDA PER OCCHI"}, {"cat": "A", "num": 1, "par": "SFONDARE"}, {"cat": "?", "num": 0, "par": "CUORE SPEZZATO"}, {"cat": "S", "num": 0, "par": "SLOT MACHINE"}, {"cat": "P", "num": 0, "par": "POLO NORD"}, {"cat": "O", "num": 0, "par": "MARSUPIO"}, {"cat": "A", "num": 1, "par": "ABBRONZARSI"}, {"cat": "?", "num": 1, "par": "ESERCIZIO"}, {"cat": "S", "num": 0, "par": "CARDINE"}, {"cat": "P", "num": 1, "par": "TAVERNA"}, {"cat": "O", "num": 1, "par": "SEGGIOLONE"}, {"cat": "A", "num": 0, "par": "DIPLOMARSI"}, {"cat": "?", 
  "num": 0, "par": "DEPLIANT"}, {"cat": "S", "num": 0, "par": "ARCOBALENO"}, {"cat": "P", "num": 1, "par": "GIOCONDA"}, {"cat": "O", "num": 0, "par": "TAVOLA DA SURF"}, {"cat": "A", "num": 1, "par": "TESTARE"}, {"cat": "?", "num": 0, "par": "CANDELA DEL MOTORE"}, {"cat": "S", "num": 0, "par": "DENARO"}, 
  {"cat": "P", "num": 0, "par": "CIGNO"}, {"cat": "O", "num": 0, "par": "ARATRO"}, {"cat": "A", "num": 1, "par": "SALTARE"}, {"cat": "?", "num": 1, "par": 
  "AHIA!"}, {"cat": "S", "num": 0, "par": "ANIMALE"}, {"cat": "P", "num": 1, "par": "PELLEGRINO"}, {"cat": "O", "num": 0, "par": "CARTA MOSCHICIDA"}, {"cat": "A", "num": 0, "par": "CAMMINARE SULL'ACQUA"}, {"cat": "?", "num": 1, "par": "ECLISSI"}, {"cat": "S", "num": 0, "par": "BACHETTE CINESI"}, {"cat": "P", "num": 0, "par": "SORELLA"}, {"cat": "O", "num": 1, "par": "IGLOO"}, {"cat": "A", "num": 1, "par": "SIMULARE"}, {"cat": "?", "num": 0, "par": "ELASTICO"}, {"cat": "S", "num": 0, "par": "TRENO MERCI"}, {"cat": "P", "num": 1, "par": "MOSCHEA"}, {"cat": "O", "num": 0, "par": "TATUAGGIO"}, {"cat": "A", "num": 0, "par": "ERIGERE"}, {"cat": "?", "num": 1, "par": "SEPARAZIONE"}, {"cat": "S", "num": 0, "par": "GHIACCIAIO"}, {"cat": "P", "num": 1, "par": "RIGA DEI CAPELLI"}, {"cat": "O", "num": 0, "par": "SPAVENTAPASSERI"}, {"cat": "A", "num": 0, "par": "SROTOLARE"}, {"cat": "?", "num": 1, "par": "BRACCIO ROTTO"}, {"cat": "S", "num": 0, "par": "ODORE"}, {"cat": "P", "num": 0, "par": "PENSIONE"}, {"cat": "O", "num": 0, "par": "STUOIA"}, {"cat": "A", "num": 1, 
  "par": "ACCOVACCIARSI"}, {"cat": "?", "num": 1, "par": "USCITA DI SICUREZZA"}, {"cat": "S", "num": 0, "par": "PARADISO"}, {"cat": "P", "num": 1, "par": "GEMELLO"}, {"cat": "O", "num": 0, "par": "UN QUARTO"}, {"cat": "A", "num": 0, "par": "DISCORRERE"}, {"cat": "?", "num": 1, "par": "STRETTOIA"}, {"cat": "S", "num": 0, "par": "VENTO"}, {"cat": "P", "num": 1, "par": "TACCHINO"}, {"cat": "O", "num": 0, "par": "TELEFONO"}, {"cat": "A", "num": 1, "par": "DORMIRE"}, {"cat": "?", "num": 0, "par": "MINUTO"}, {"cat": "S", "num": 0, "par": "PROFILO"}, {"cat": "P", "num": 0, "par": "CRISTOFORO COLOMBO"}, {"cat": "O", "num": 1, "par": "MAZZA DA GOLF"}, {"cat": "A", "num": 1, "par": "SPAZZARE"}, {"cat": "?", "num": 0, "par": "SBROGLIARE"}, {"cat": "S", "num": 0, "par": "PRATO"}, {"cat": "P", "num": 1, "par": "MONDO"}, {"cat": "O", "num": 0, "par": "SCHIUMA DA BARBA"}, {"cat": "A", "num": 0, "par": "MISURARE"}, {"cat": "?", "num": 1, "par": "SONNAMBULISMO"}, {"cat": "S", "num": 0, "par": "GAMBE ACCAVALLATE"}, {"cat": "P", "num": 0, "par": "FRANCIA"}, {"cat": "O", "num": 0, "par": "MATITA"}, {"cat": "A", "num": 1, "par": "GALOPPARE"}, {"cat": "?", "num": 0, "par": "RUOTA PANORAMICA"}, {"cat": "S", "num": 0, "par": "CORSA IPPICA"}, {"cat": "P", "num": 0, "par": "CAPANNONE"}, {"cat": "O", "num": 1, "par": "UFO"}, {"cat": "A", "num": 1, "par": "ATTERRARE"}, {"cat": "?", "num": 0, "par": "SGUARDO"}, {"cat": "S", "num": 0, "par": "MULINO A VENTO"}, {"cat": "P", "num": 1, "par": "MAGGIORDOMO"}, {"cat": "O", "num": 1, "par": "CERCHIO"}, {"cat": "A", "num": 0, "par": "COMPRARE"}, {"cat": "?", "num": 0, "par": "TUBAZIONE"}, {"cat": "S", "num": 0, "par": "BOMBA DI PROFONDITA'"}, {"cat": "P", "num": 1, "par": "ALBERTO SORDI"}, {"cat": "O", "num": 1, "par": "MAGLIETTA"}, {"cat": "A", "num": 0, "par": "ODORARE"}, {"cat": "?", "num": 0, "par": "UOVO CON BACON"}, {"cat": "S", "num": 0, "par": "FORCHETTA"}, {"cat": "P", "num": 0, "par": "AREA DI RIGORE"}, {"cat": "O", "num": 1, "par": "LUCCHETTO"}, {"cat": "A", "num": 0, "par": "SPOLVERARE"}, {"cat": "?", "num": 1, "par": "DIARIO"}, {"cat": "S", "num": 0, "par": "VELOCITA' DI ATTERRAGGIO"}, 
  {"cat": "P", "num": 1, "par": "CLEOPATRA"}, {"cat": "O", "num": 0, "par": "OMBRELLO"}, {"cat": "A", "num": 1, "par": "LEGARE"}, {"cat": "?", "num": 0, "par": "MINUSCOLO"}, {"cat": "S", "num": 0, "par": "PORTA GIREVOLE"}, {"cat": "P", "num": 0, "par": "CIMICE"}, {"cat": "O", "num": 1, "par": "REGISTRATORE"}, {"cat": "A", "num": 1, "par": "FONDERE"}, {"cat": "?", "num": 0, "par": "PALLANUOTO"}, {"cat": "S", "num": 0, "par": "REGGISENO"}, {"cat": "P", "num": 1, "par": "BOLOGNA"}, {"cat": "O", "num": 0, "par": "SACCO DI SABBIA"}, {"cat": "A", "num": 1, "par": "TORMENTARE"}, {"cat": "?", "num": 0, "par": "TRAZIONE"}, {"cat": "S", "num": 0, "par": "PINZETTE"}, {"cat": "P", "num": 0, "par": "FORMICA"}, {"cat": "O", "num": 1, "par": "ZUCCA"}, {"cat": "A", "num": 
  1, "par": "RASCHIARE"}, {"cat": "?", "num": 0, "par": "DISPENSA"}, {"cat": "S", "num": 0, "par": "ORSA MAGGIORE"}, {"cat": "P", "num": 1, "par": "VELODROMO"}, {"cat": "O", "num": 0, "par": "BRACCIALETTO"}, {"cat": "A", "num": 1, "par": "INCHINARSI"}, {"cat": "?", "num": 0, "par": "PING PONG"}, {"cat": "S", "num": 0, "par": "MURO"}, {"cat": "P", "num": 0, "par": "CAMMELLO"}, {"cat": "O", "num": 0, "par": "LANCIA"}, {"cat": "A", "num": 1, "par": "SCARROZZARE"}, {"cat": "?", "num": 1, "par": "SALA OPERATORIA"}, {"cat": "S", "num": 0, "par": "SINA"}, {"cat": "P", "num": 1, "par": "CASTORO"}, {"cat": "O", "num": 0, "par": "CANDELA"}, {"cat": "A", "num": 1, "par": "CAPOVOLGERSI"}, {"cat": "?", "num": 1, "par": "BECCHIME"}, {"cat": "S", "num": 0, "par": "FORFORA"}, {"cat": "P", "num": 0, "par": "IPPOPOTAMO"}, {"cat": "O", "num": 1, "par": "FOSSILE"}, {"cat": "A", "num": 0, "par": "AFFIBBIARE"}, {"cat": "?", "num": 1, "par": "PORTARE AVANTI"}, {"cat": "S", "num": 0, "par": "RIPIDO"}, {"cat": "P", "num": 1, "par": "INCISIVO"}, {"cat": "O", "num": 0, "par": "MONOPOLI"}, {"cat": "A", "num": 1, "par": "DIMENTICARE"}, {"cat": "?", "num": 0, "par": "BOTTIGLIA DI BIRRA"}, {"cat": "S", "num": 0, "par": "TEMPESTA DI NEVE"}, {"cat": "P", "num": 0, "par": "PELLICANO"}, {"cat": "O", "num": 0, "par": "POMPON"}, {"cat": "A", "num": 1, "par": "DOPPIARE"}, {"cat": "?", "num": 1, "par": "MAGRO"}, {"cat": "S", "num": 0, "par": "TANGA"}, {"cat": "P", "num": 0, "par": "ALPI"}, {"cat": "O", "num": 1, "par": "CITOFONO"}, {"cat": "A", 
  "num": 0, "par": "PRENDERE IL SOLE"}, {"cat": "?", "num": 1, "par": "TU"}, {"cat": "S", "num": 0, "par": "BASSO"}, {"cat": "P", "num": 0, "par": "PIEMONTE"}, {"cat": "O", "num": 0, "par": "BISCOTTO"}, {"cat": "A", "num": 1, "par": "STRANGOLARE"}, {"cat": "?", "num": 1, "par": "SCATOLA DI FIAMMIFERI"}, {"cat": "S", "num": 0, "par": "CUGINO"}, {"cat": "P", "num": 0, "par": "CAPPELLA SISTINA"}, {"cat": "O", "num": 1, "par": "SIGARETTA"}, {"cat": "A", "num": 0, "par": "FRUSTARE"}, {"cat": "?", "num": 1, "par": "INVISIBILE"}, {"cat": "S", "num": 0, "par": "GEYSER"}, {"cat": "P", "num": 1, "par": "GATTO"}, {"cat": "O", 
  "num": 0, "par": "MONETA DA 10 LIRE"}, {"cat": "A", "num": 1, "par": "BOCCIARE"}, {"cat": "?", "num": 0, "par": "INFELICE"}, {"cat": "S", "num": 0, "par": "NAVICELLA SPAZIALE"}, {"cat": "P", "num": 0, "par": "ZEBRA"}, {"cat": "O", "num": 1, "par": "FAGIOLO"}, {"cat": "A", "num": 1, "par": "SPENDERE"}, {"cat": "?", "num": 0, "par": "SIMMETRICO"}, {"cat": "S", "num": 0, "par": "MURO DEL SUONO"}, {"cat": "P", "num": 1, "par": "PEARL HARBOUR"}, {"cat": "O", "num": 0, 
  "par": "ARMADIETTO"}, {"cat": "A", "num": 1, "par": "CATAPULTARE"}, {"cat": "?", "num": 0, "par": "PUNCH"}, {"cat": "S", "num": 0, "par": "HALLOWEEN"}, {"cat": "P", "num": 0, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 0, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}, {"cat": "P", "num": 0, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 0, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}, {"cat": "P", "num": 0, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 0, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}, {"cat": "P", "num": 0, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 0, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}, {"cat": "P", "num": 0, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 0, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}, {"cat": "P", "num": 0, "par": "MOTEL"}, {"cat": "O", "num": 1, "par": "BURATTINO"}, {"cat": "A", "num": 1, "par": "TIRARE"}, {"cat": "?", "num": 0, "par": "PASTICCERIA"}, {"cat": "S", "num": 0, "par": "SUPERFICIE ESTERNA"}, {"cat": "P", "num": 0, "par": "PONY"}, {"cat": "O", "num": 1, "par": "SCARPA"}, {"cat": "A", "num": 0, "par": "SUGGERIRE"}, 
  {"cat": "?", "num": 1, "par": "SBANDAMENTO"}, {"cat": "S", "num": 0, "par": "ARIA"}, {"cat": "P", "num": 0, "par": "CINTOLA"}, {"cat": "O", "num": 1, "par": "PRESEPIO"}, {"cat": "A", "num": 1, "par": "SOFFOCARE"}, {"cat": "?", "num": 0, "par": "SECONDO PIANO"}, {"cat": "S", "num": 0, "par": "GATTO DELLE NEVI"}, {"cat": "P", "num": 0, "par": "BIBLIOTECA"}, {"cat": "O", "num": 1, "par": "FUOCHI D'ARTIFICIO"}, {"cat": "A", "num": 0, "par": "FOTOGRAFARE"}, {"cat": "?", "num": 1, "par": "MANISCALCO"}, {"cat": "S", "num": 0, "par": "AGOSTO"}, {"cat": "P", "num": 1, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 1, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}, {"cat": "P", "num": 0, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 0, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}, {"cat": "P", "num": 0, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 0, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}, 
  {"cat": "P", "num": 0, "par": "NULL"}, {"cat": "O", "num": 0, "par": "NULL"}, {"cat": "A", "num": 0, "par": "NULL"}, {"cat": "?", "num": 0, "par": "NULL"}, {"cat": "S", "num": 0, "par": "NULL"}]

  cardList: Map<number, Card> = new Map();
  cards: Card[] = [];

  ngOnInit(): void {
    for(let i = 0; i < this.data.length; i+=5) {
      this.cards.push({
        p: new P(this.data[i].num, this.data[i].par),
        o: new O(this.data[i+1].num, this.data[i+1].par),
        a: new A(this.data[i+2].num, this.data[i+2].par),
        u: new U(this.data[i+3].num, this.data[i+3].par),
        s: new S(this.data[i+4].num, this.data[i+4].par)
      });
    }

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
    this.card = this.cardList.get(rndInt);

    this.value = 100;
    this.curSec = 0;
    this.blur = false;
    if(this.check) {
      this.sub!.unsubscribe();
      this.check = !this.check;
    }

    let challenge = <HTMLVideoElement> document.getElementById("challenge");

    switch(cat) {
      case 'P':
        this.cardToShow.value = this.card!.p!.value == 0 ? 'NO' : 'SI';
        this.cardToShow.word = this.card?.p?.word;
        if(!this.card?.p?.value)
          this.startTimer();
        else {
          this.showTopCenter();
          challenge.play();
        }
        break;
      case 'O':
        this.cardToShow.value = this.card!.o!.value == 0 ? 'NO' : 'SI';
        this.cardToShow.word = this.card?.o?.word;
        if(!this.card?.o?.value)
          this.startTimer();
        else {
          this.showTopCenter();
          challenge.play();
        }
        break;
      case 'A':
        this.cardToShow.value = this.card!.a!.value == 0 ? 'NO' : 'SI';
        this.cardToShow.word = this.card?.a?.word;
        if(!this.card?.a?.value)
          this.startTimer();
        else {
          this.showTopCenter();
          challenge.play();
        }
        break;
      case '?':
        this.cardToShow.value = this.card!.u!.value == 0 ? 'NO' : 'SI';
        this.cardToShow.word = this.card?.u?.word;
        if(!this.card?.u?.value)
          this.startTimer();
        else {
          this.showTopCenter();
          challenge.play();
        }
        break;
      case 'S':
        this.cardToShow.value = 'SI';
        this.cardToShow.word = this.card?.s?.word;
        challenge.play();
        this.showTopCenter();
        break;
    }
  }

  startTimer() {
    const time = this.timer;
    const timer$ = interval(1000);

    this.sub = timer$.subscribe((sec) => {
      this.check = true;
      this.value = 100 - sec * 100 / time;
      this.curSec = sec;
      let timeout = <HTMLVideoElement> document.getElementById("timeout");

      if (this.curSec === time) {
        timeout.play();
        this.sub!.unsubscribe();
        this.check = false;
        this.blur = false;
      }
    });
  }

  rollDice() {
    this.value = 100;
    this.curSec = 0;
    this.blur = false;
    if(this.check) {
      this.check = false;
      this.sub!.unsubscribe();
    }

    this.buttonState = (this.buttonState === 'normal') ? 'squeezed' : 'normal';

    this.dice = this.randomIntFromInterval(1, 6);
    console.log("è uscito: ", this.dice);

    var dice  = document.getElementById('dice');
    for (var i = 1; i <= 6; i++) {
      dice!.classList.remove('show-' + i);
      if (this.dice === i) {
        dice!.classList.add('show-' + i);
      }
    }    
  }

  setCat(cat: string) {
    this.catShow = cat;
  }

  toggleBlur() {
    this.blur = !this.blur;
  }
}
