
/*
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  activeEffect:Boolean = false;


  categories:Array<any> = [
    {
      title: 'Electrical',
      subtitle:'For any electrical needs',
      description: 'Electrical needs',
      price: '200',
      img: 'assets/imgs/home_slide_1.jpg'
    },
    {
      title: 'Plumbing',
      subtitle: 'For any plumbing needs',
      description: 'Plumbing needs',
      price: '200',
      img: 'assets/imgs/home_slide_1.jpg'
    },
    {
      title: 'Painter',
      subtitle: 'For any painting needs',
      description: 'For any painting needs',
      price: '200',
      img: 'assets/imgs/home_slide_3.jpg'
    },
    {
      title: 'Beautician',
      subtitle: 'For any beauty needs',
      description: 'For any beauty needs',
      price: '200',
      img: 'assets/imgs/home_slide_3.jpg'
    }
  ];

  products:Array<any> = [
    {
      title: 'Fix Fan',
      subtitle:'10% descuento',
      description: 'test fan',
      price: '200',
      img: 'assets/imgs/home_slide_1.jpg'
    },
    {
      title: 'Fix Fan',
      subtitle:'10% descuento',
      description: 'test fan',
      price: '200',
      img: 'assets/imgs/home_slide_2.jpg'
    },
    {
      title: 'Fix Fan',
      subtitle:'10% descuento',
      description: 'test fan',
      price: '200',
      img: 'assets/imgs/home_slide_3.jpg'
    },
    {
      title: 'Fix Fan',
      subtitle:'10% descuento',
      description: 'test fan',
      price: '200',
      img: 'assets/imgs/home_slide_4.jpg'
    }
  ];

  constructor(private navCtrl: NavController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cagando...',
    });
    await loading.present();

    setTimeout(() => {
      loading.dismiss()
      this.activeEffect = true;
    },500)
  }

  openProduct(prod){
    this.navCtrl.navigateForward('/product', { queryParams:{ params: JSON.stringify(prod)} })
  }

}
*/
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from './../../cart-modal/cart-modal.page';
import { CartService } from './../../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  cart = [];
  products;
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(private cartService: CartService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.cartService.getProducts().subscribe(res =>  {
      this.products = res;
    });

    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    // https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }
}
