import { createEffect, type Component, createSignal } from 'solid-js';
import { invoke } from '@tauri-apps/api';
import { IStaticMethods } from 'preline/preline'
import { useLocation } from '@solidjs/router'

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods
    }
}

export function App() {
    const location = useLocation();
    const [_, setLoc] = createSignal(location.pathname)
    createEffect(() => {
        setLoc(location.pathname);
        window.HSStaticMethods.autoInit();
    })
    return <div>
        <div class="text-4xl text-green-700 text-center py-20">Hello world!</div>
        <button onClick={() => {
            invoke('greet', { name: 'World' })
            .then(response => {
                console.log(response);
            })
        }}>Greet!</button>
    </div>
}
