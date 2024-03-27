/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import 'preline/preline'
import { App } from './App';
import { Router} from '@solidjs/router'

const root = document.getElementById('root');

render(() => <>
    <Router>
        <App></App>
    </Router>
</>, root!);

export function hello() {
    return 'Hello';
}
