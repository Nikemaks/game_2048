import {Component, HostListener, OnInit} from '@angular/core';
import {Item} from "../../models/item";
import {GameService} from "../../services/game.service";

const colorMap: { [k: number]: string } = {
  2: '#626567',
  4: '#424949',
  8: '#7E5109',
  16: '#196f3D',
  32: '#138D75',
  64: '#154360',
  128: '#9B59B6',
  256: '#78281f',
  512: '#C0392B',
  1024: '#7d6608',
  2048: '#45b39d',
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  keyEventCodeMap: { [type: string]: keyof GameService } = {
    ArrowRight: 'right',
    ArrowLeft: 'left',
    ArrowDown: 'down',
    ArrowUp: 'up',
  };

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }

  public getStyles(item: Item) {
    const top = (item.row * 110 - 100) + 'px';
    const left = (item.col * 110 - 100) + 'px';
    return {
      top,
      left,
      'background-color': colorMap[item.value] || 'black'
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    switch (this.keyEventCodeMap[event.code]) {
      case this.keyEventCodeMap.ArrowRight:
        this.gameService.right();
        break;
      case this.keyEventCodeMap.ArrowLeft:
        this.gameService.left();
        break;
      case this.keyEventCodeMap.ArrowDown:
        this.gameService.down();
        break;
      case this.keyEventCodeMap.ArrowUp:
        this.gameService.up();
        break;
    }
  }

}
