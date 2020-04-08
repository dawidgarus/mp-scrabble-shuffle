export class Shuffle {

    private tiles: string[][];

    constructor(tilesString: string, size: number) {
        const tilesArray = tilesString.substr(0, size * size).split('');
        const tiles = Array(size).fill(null)
            .map((row, i) => Array(size).fill(null).map((col, j) => tilesString.charAt(i * size + j) || null));
        this.tiles = tiles;
    }

    shuffle(seed: string, transpose: boolean) {
        let tiles = this.tiles;
        if (transpose) {
            tiles = this.transpose(tiles);
        }
        const suffleBy = seed.split('').map(value => +value);
        tiles = tiles.map((row, i) => [...row.slice(row.length - suffleBy[i]), ...row.slice(0, row.length - suffleBy[i])]);
        if (transpose) {
            tiles = this.transpose(tiles);
        }
        this.tiles = tiles;
        return tiles;
    }

    shuffle2(transpose: boolean) {
        this.shuffle23(2, transpose);
    }

    shuffle3(transpose: boolean) {
        this.shuffle23(3, transpose);
    }

    getQueue() {
        return this.tiles.reduce((queue, row) => [...queue, ...row], []);
    }

    private shuffle23(step: number, transpose: boolean) {
        let tiles = this.tiles;
        if (transpose) {
            tiles = this.transpose(tiles);
        }
        tiles = [
            ...tiles.filter((row, index) => (index % step === 1)).reverse(),
            ...tiles.filter((row, index) => (index % step !== 1)),
        ];
        if (transpose) {
            tiles = this.transpose(tiles);
        }
        this.tiles = tiles;
        return tiles;
    }

    private transpose(tiles: string[][]): string[][] {
        return tiles[0].map((col, i) => tiles.map(row => row[i]));
    }
}
