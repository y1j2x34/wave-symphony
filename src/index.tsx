/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import 'preline/preline';
import { App } from './App';
import { Solidium } from '@vgerbot/solidium';
import { HttpClient } from '@vgerbot/solidium-http';
import { processRsAPIInstance } from './rs-api/RsAPI';

const root = document.getElementById('root');

render(
    () => (
        <>
            <Solidium
                autoRegisterClasses={[HttpClient.configure({})]}
                init={app => {
                    app.registerAfterInstantiationProcessor(processRsAPIInstance);
                }}
            >
                <App></App>
            </Solidium>
        </>
    ),
    root!
);

export function hello() {
    return 'Hello';
}
