import { Lyric } from '@/music/Lyric';
import { invoke } from '@tauri-apps/api';
import { InvokeArgs } from '@tauri-apps/api/tauri';
import { Newable } from '@vgerbot/ioc';

interface IRsAPI {
    greet(params: { name: string }): Promise<string>;
    parse_lyric(params: { lyric: string }): Promise<Lyric>;
}

export const RsAPI = class {} as unknown as Newable<IRsAPI>;

export function processRsAPIInstance<T>(instance: T): T {
    if (instance instanceof RsAPI) {
        return new Proxy(instance as object, {
            get(target, p, receiver) {
                if (typeof p === 'symbol') {
                    return Reflect.get(target, p, receiver);
                }
                return function (args?: InvokeArgs | undefined) {
                    return invoke(p, args);
                };
            },
        }) as T;
    }
    return instance;
}
