import { Observe, Signal } from '@vgerbot/solidium';
import { HSStaticMethods } from 'preline';

export class PrelineService {
    @Signal
    location: string = location.pathname;

    @Observe<PrelineService>({
        deps: [
            function () {
                return this.location;
            },
        ],
    })
    onLocationChanged() {
        HSStaticMethods.autoInit();
    }
}
