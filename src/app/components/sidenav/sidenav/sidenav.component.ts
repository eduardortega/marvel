import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @Input() selectedHero;
  @Input() toggleSidenav: boolean;

  @Output() messageEvent = new EventEmitter<boolean>();

  messageEmit = {
    toggleSidenav: false
  }

  /**
   * close sidenav
   * send message to parent 
   */
  emitSidenav() {
    this.messageEvent.emit(this.messageEmit.toggleSidenav)
  }

}
