import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePage} from './home/home.page';
import {FormsModule} from '@angular/forms';
import {GamePage} from './game/game.page';

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        GamePage,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule,
        IonicModule.forRoot({
            animated: false,
            mode: 'ios'
        }),
        AppRoutingModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
