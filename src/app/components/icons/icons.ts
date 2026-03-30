import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  template: `
    <svg [attr.width]="size" [attr.height]="size" [attr.viewBox]="viewBox" [attr.fill]="color" [attr.class]="iconClass">
      <use [attr.href]="'#' + name"></use>
    </svg>
  `,
  styles: [`
    svg {
      display: inline-block;
      vertical-align: middle;
    }
  `]
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: string = '24';
  @Input() color: string = 'currentColor';
  @Input() viewBox: string = '0 0 24 24';
  @Input() iconClass: string = '';
}

