import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { product } from '../counter/models/product.models';
import { CommonModule } from '@angular/common';
import { CartService} from '../../services/cart.service'
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  private CartService = inject(CartService);
  cart = this.CartService.cart;
  total = this.CartService.total;

  toogleSideMenu(){
    this.hideSideMenu.update(prevState => !prevState);
  }
}
