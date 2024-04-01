import { invoke } from '@tauri-apps/api';
import { InvokeArgs } from '@tauri-apps/api/tauri';

export interface IRsAPI {
    greet(params: { name: string }): Promise<string>;
}
export class RsAPI implements IRsAPI {
    greet(params: { name: string }): Promise<string> {
        throw new Error('Method not implemented.');
    }
}
export function processRsAPIInstance<T>(instance: T): T {
    if (instance instanceof RsAPI) {
        return new Proxy(instance, {
            get(target, p, receiver) {
                if (typeof p === 'symbol') {
                    return Reflect.get(target, p, receiver);
                }
                return function (args?: InvokeArgs | undefined) {
                    return invoke(p, args);
                };
            },
        });
    }
    return instance;
}
