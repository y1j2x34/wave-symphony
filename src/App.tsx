import { IStaticMethods } from 'preline/preline'
import { useService } from '@vgerbot/solidium';
import { RsAPI } from './rs-api/RsAPI';

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods
    }
}

export function App() {
    const api = useService(RsAPI);
    return <div>
        <div class="text-4xl text-green-700 text-center py-20">Hello world!</div>
        <button onClick={() => {
            api.greet({
                name: 'World'
            }).then(response => {
                console.log(response);
            })
        }}>Greet!</button>
    </div>
}
