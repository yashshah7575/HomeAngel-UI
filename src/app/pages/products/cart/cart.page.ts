import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  activeEffect:Boolean = false;

  products:Array<any> = [
    {
      title:'Fix Fan',
      img:'assets/imgs/fruits/03.jpg',
      state:'State',
      quantity:2,
      description:'All Fan needs',
      unitPrice: 2000,
      totalPrice: 4000
    },
    {
      title:'Fix light',
      img:'assets/imgs/fruits/03.jpg',
      state:'State',
      quantity:2,
      description:'All light needs',
      unitPrice: 2000,
      totalPrice: 4000
    }
  ]

  constructor(public alertController: AlertController, private navCtrl:NavController, private loadingController:LoadingController) { }

  ngOnInit() {
    this.presentLoading();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Desea eliminar este producto?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Si')
          }
        }
      ]
    });

    await alert.present();
  }

  goToProduc(prod){
    this.navCtrl.navigateForward('/edit-product', { queryParams:{ params: JSON.stringify(prod)} })
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

  
}
