import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroPageModule } from '../pages/intro/intro.module';
import { LoginPageModule } from '../pages/login/login.module';
import { UserProvider } from '../providers/user/user';
import { LoginService } from '../pages/login/login.service';
import { HttpModule } from '@angular/http';
import { CadastroPageModule } from '../pages/cadastro/cadastro.module';
import { CadastroService } from '../pages/cadastro/cadastro.service';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { InfoPageModule } from '../pages/info/info.module';
import { HomePageModule } from '../pages/home/home.module';

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		HttpModule,
		IntroPageModule,
		LoginPageModule,
		CadastroPageModule,
		InfoPageModule,
		BrMaskerModule,
		HomePageModule,
		IonicModule.forRoot(MyApp, {
			backButtonText: '',
			backButtonIcon: 'arrow-round-back',
			iconMode: 'md'
		}),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp
	],
	providers: [
		StatusBar,
		SplashScreen,
		LoginService,
		CadastroService,
		UserProvider,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
	]
})
export class AppModule { }
