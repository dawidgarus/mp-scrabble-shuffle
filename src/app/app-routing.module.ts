import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomePage} from './home/home.page';
import {GamePage} from './game/game.page';
import {SeedsResolver} from './resolvers/seeds-resolver';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'game/:seeds',
        component: GamePage,
        resolve: {
            seeds: SeedsResolver,
        },
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
