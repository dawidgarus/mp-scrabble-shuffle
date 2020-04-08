import {Component} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Shuffle} from '../utils/shuffle';
import {ActivatedRoute} from '@angular/router';

const TILES_EN = 'A'.repeat(9)
    + 'B'.repeat(2)
    + 'C'.repeat(2)
    + 'D'.repeat(4)
    + 'E'.repeat(12)
    + 'F'.repeat(2)
    + 'G'.repeat(3)
    + 'H'.repeat(2)
    + 'I'.repeat(9)
    + 'J'.repeat(1)
    + 'K'.repeat(1)
    + 'L'.repeat(4)
    + 'M'.repeat(2)
    + 'N'.repeat(6)
    + 'O'.repeat(8)
    + 'P'.repeat(2)
    + 'Q'.repeat(1)
    + 'R'.repeat(6)
    + 'S'.repeat(4)
    + 'T'.repeat(6)
    + 'U'.repeat(4)
    + 'V'.repeat(2)
    + 'W'.repeat(2)
    + 'X'.repeat(1)
    + 'Y'.repeat(2)
    + 'Z'.repeat(1)
    + '_'.repeat(2);

@Component({
    selector: 'app-game',
    templateUrl: 'game.page.html',
    styleUrls: ['game.page.scss'],
})
export class GamePage {

    math = Math;

    tiles = 1;
    count = 0;
    left = 0;

    history = [];

    queue: string[];

    constructor(private toast: ToastController, private route: ActivatedRoute) {
        route.data.subscribe(data => {
            const shuffle = new Shuffle(TILES_EN, 10);
            const seeds: string[] = data.seeds;
            let transpose = true;
            for (const seed of seeds) {
                shuffle.shuffle(seed, transpose);
                transpose = !transpose;
            }
            shuffle.shuffle2(false);
            shuffle.shuffle2(true);
            shuffle.shuffle3(false);
            shuffle.shuffle3(true);
            this.queue = shuffle.getQueue();
            console.log('queue', this.queue.join(''));
            this.tiles = 1;
            this.count = 0;
            this.left = this.queue.length;
            this.history = [];
        });
    }

    onDraw(tiles: number) {
        if (tiles <= this.left) {
            const count = this.count;
            this.count += tiles;
            this.left -= tiles;
            this.tiles = Math.min(1, this.left);
            this.history = [
                {type: 'draw', count: tiles, tiles: this.queue.slice(count, count + tiles)},
                ...this.history,
            ];
        }
    }

    onDiscard(tiles: number) {
        if (tiles <= this.left) {
            const count = this.count;
            this.count += tiles;
            this.left -= tiles;
            this.tiles = Math.min(1, this.left);
            this.history = [
                {type: 'discard', count: tiles},
                ...this.history,
            ];
        }
    }

    onUndo() {
        if (this.queue.length) {
            const [last, ...history] = this.history;
            this.count -= last.count;
            this.left += last.count;
            this.tiles = 1;
            this.history = history;
        }
    }

    async ionViewDidEnter() {
        const toast = await this.toast.create({
            position: 'bottom',
            color: 'success',
            message: 'Share a link to this page with other people for them to join the game',
            duration: 5000,
        });
        toast.present();
    }
}
