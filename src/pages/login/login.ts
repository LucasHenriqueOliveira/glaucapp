import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from './login.model';
import { HomePage } from '../home/home';
import { LoginService } from './login.service';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	private formLogin: FormGroup
	
	emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	dataToken: any = []
	dataUser: any = []
	dataForgotEmail: any = []

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private formBuilder: FormBuilder, 
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		private loginService: LoginService,
		private userProvider: UserProvider,
		private storage: Storage) {
		
		this.formLogin = this.formBuilder.group({
			email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
			password: this.formBuilder.control('', [Validators.required])
		})
	}

	ionViewDidLoad() {
	}

	login(login: Login) {
		this.storage.clear();
		let loader = this.loadingCtrl.create({content: "Aguarde..."});
		loader.present();

		this.loginService.login(login).subscribe(data => {
			this.dataToken = data
			this.storage.set('token', this.dataToken.data.token)

			this.userProvider.getUser().subscribe(res => {
				this.dataUser = res
				this.storage.set('user', this.dataUser.data)
				loader.dismiss()
				this.navCtrl.push(HomePage);
			  }, err => {
				this.storage.clear();
				loader.dismiss();
				let toast = this.toastCtrl.create({
					message: 'Usuário não encontrado!',
					duration: 3000,
					position: 'middle',
					cssClass: 'toast-error'
				});
				toast.present();
			  })
		  }, err => {
			this.storage.clear();
			loader.dismiss();
			let toast = this.toastCtrl.create({
				message: 'Usuário não encontrado!',
				duration: 3000,
				position: 'middle',
				cssClass: 'toast-error'
			});
			toast.present();
		  })
	}

	esqueceuSenha() {
		let prompt = this.alertCtrl.create({
		  title: 'Esqueceu a senha?',
		  message: "Entre com o seu e-mail cadastrado",
		  inputs: [
			{
			  name: 'email',
			  placeholder: 'Seu e-mail'
			},
		  ],
		  buttons: [
			{
			  text: 'Cancelar'
			},
			{
			  text: 'Enviar',
			  handler: data => {
				let loader = this.loadingCtrl.create({content: "Aguarde..."});
				loader.present();

				this.loginService.esqueceuSenha(data).subscribe(res => {
					this.dataForgotEmail = res
					loader.dismiss();
					if(this.dataForgotEmail.error) {
						let toast = this.toastCtrl.create({
							message: this.dataForgotEmail.message,
							duration: 3000,
							position: 'middle',
							cssClass: 'toast-error'
						});
						toast.present();
					} else {
						let toast = this.toastCtrl.create({
							message: "Enviamos um email com informações da nova senha!",
							duration: 3000,
							position: 'middle',
							cssClass: 'toast-success'
						});
						toast.present();
					}
				  }, err => {
					loader.dismiss();
					let toast = this.toastCtrl.create({
						message: 'Erro ao recuperar a senha do usuário!',
						duration: 3000,
						position: 'middle',
						cssClass: 'toast-error'
					});
					toast.present();
				  })
			  }
			}
		  ]
		});
		prompt.present();
	}

}
