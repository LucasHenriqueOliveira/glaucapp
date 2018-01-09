import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cadastro } from "./cadastro.model";
import { CadastroService } from "./cadastro.service";
import { UserProvider } from "../../providers/user/user";
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";

/**
 * Generated class for the CadastroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-cadastro',
	templateUrl: 'cadastro.html',
})
export class CadastroPage {

	private formSignUp: FormGroup

	dataSignup: any = []
	dataUser: any = []
	emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		private cadastroService: CadastroService,
		private userProvider: UserProvider,
		private storage: Storage) {
		this.formSignUp = this.formBuilder.group({
			nome: this.formBuilder.control('', [Validators.required]),
			email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
			telefone: this.formBuilder.control('', [Validators.required]),
			password: this.formBuilder.control('', [Validators.required]),
			confirm_password: this.formBuilder.control('', [Validators.required])
		})
	}

	ionViewDidLoad() {
	}

	termos() {
		
	}

	signup(signup: Cadastro) {
		let loader = this.loadingCtrl.create({ content: "Aguarde..." });
		loader.present();

		this.cadastroService.signup(signup).subscribe(data => {
			this.dataSignup = data
			this.storage.set('token', this.dataSignup.data.token)

			this.userProvider.getUser().subscribe(res => {
				this.dataUser = res
				this.storage.set('user', this.dataUser.data)
				loader.dismiss()
				this.navCtrl.push(HomePage);
			}, err => {
				this.storage.clear();
				loader.dismiss();
				let toast = this.toastCtrl.create({
					message: 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente!',
					duration: 3000,
					position: 'middle',
					cssClass: 'toast-error'
				});
				toast.present();
			})
		}, err => {
			loader.dismiss();
			let toast = this.toastCtrl.create({
				message: 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente!',
				duration: 3000,
				position: 'middle',
				cssClass: 'toast-error'
			});
			toast.present();
		})
	}

}