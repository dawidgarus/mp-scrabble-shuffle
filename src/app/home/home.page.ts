import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    seeds = [
        {value: ''},
        {value: ''},
    ];

    constructor(private nav: NavController) {
    }

    trackByIndex(obj: any, index: number) {
        return index;
    }

    onRemoveSeed(index: number) {
        this.seeds = this.seeds.filter((seed, i) => i !== index);
    }

    onRandomizeSeed(seed) {
        const value = `000000000${Math.round(Math.random() * 10_000_000_000)}`;
        seed.value = value.substr(value.length - 10);
    }

    onAddSeed() {
        this.seeds = [...this.seeds, {value: ''}];
    }

    onPlay() {
        this.nav.navigateForward(['game', this.seeds.map(seed => seed.value).join(',')]);
    }

    ionViewWillEnter() {
        this.seeds = [
            {value: ''},
            {value: ''},
        ];
    }
}
