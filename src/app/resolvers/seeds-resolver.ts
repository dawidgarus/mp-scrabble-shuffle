import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SeedsResolver implements Resolve<string[]> {

    constructor(private route: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string[] {
        const seeds = route.params.seeds.split(',');
        if (seeds.every(seed => seed.length === 10)) {
            return seeds;
        } else {
            this.route.navigateByUrl('/');
            return null;
        }
    }
}
