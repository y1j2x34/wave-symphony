import { type Component } from 'solid-js';
import { invoke } from '@tauri-apps/api';

export function App() {
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
