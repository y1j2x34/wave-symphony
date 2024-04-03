import { WindowEventListener } from '@solid-primitives/event-listener';
import { throttle, debounce } from '@solid-primitives/scheduled';
import { Show, createSignal } from 'solid-js';
import { untrack } from 'solid-js/web';

export interface ProgressProps {
    label: string;
    value: number;
    max: number;
    min: number;
    helperText1?: string;
    helperText2?: string;
    disabled?: boolean;
    wheelOffset?: (e: WheelEvent) => number;
    onChange: (newValue: number, type: 'click' | 'drag' | 'wheel') => void;
}
export function Slider(props: ProgressProps) {
    const [controlInfo, setControlInfo] = createSignal({
        startX: 0,
        progressBarWidth: -1,
        isDragging: false,
    });
    const [draggingWidth, setDraggingWidth] = createSignal(0);
    let progressBarElement!: HTMLDivElement;
    let progressElement!: HTMLDivElement;
    let draggerElement!: HTMLDivElement;

    const progressbarWidth = () => {
        const { isDragging } = controlInfo();
        if (isDragging && !!progressElement) {
            return Math.min(1, draggingWidth() / progressElement.offsetWidth) * 100 + '%';
        }
        return Math.min(1, props.value / (props.max - props.min)) * 100 + '%';
    };
    const calculateProgress = (newWidth: number) => {
        const ratio = Math.min(1, Math.max(0, newWidth) / progressElement.offsetWidth);
        return (props.max - props.min) * ratio;
    };
    const handlePointermove = throttle((e: PointerEvent) => {
        const { isDragging, startX, progressBarWidth } = controlInfo();
        if (!isDragging) {
            return;
        }
        const deltaX = e.clientX - startX;
        const newDraggingWidth = Math.max(0, progressBarWidth + deltaX);
        const cssWidth = Math.min(1, draggingWidth() / progressElement.offsetWidth) * 100 + '%';
        progressBarElement.style.width = cssWidth;
        draggerElement.style.left = cssWidth;
        setDraggingWidth(newDraggingWidth);
    }, 100);
    const onMoveStopped = debounce((e: PointerEvent) => {
        const newValue = calculateProgress(draggingWidth());
        props.onChange(newValue, 'drag');
    }, 1000);
    return (
        <div
            class="space-y-2"
            onWheel={e => {
                e.preventDefault();
                const delta = props.wheelOffset ? props.wheelOffset(e) : e.deltaX || e.deltaY;
                const newValue = calculateProgress(progressBarElement.offsetWidth + delta);
                props.onChange(newValue, 'wheel');
            }}
        >
            <WindowEventListener
                onPointermove={e => {
                    handlePointermove(e);
                    onMoveStopped(e);
                }}
                onPointerup={() => {
                    progressBarElement.classList.add('transition-all');
                    draggerElement.classList.add('transition-all');
                    untrack(() => {
                        const newValue = calculateProgress(draggingWidth());
                        props.onChange(newValue, 'drag');
                        setControlInfo({
                            ...controlInfo(),
                            isDragging: false,
                        });
                    });
                }}
            ></WindowEventListener>
            <div class="relative">
                <div
                    class="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden"
                    ref={progressElement}
                    onClick={e => {
                        if (e.button !== 0) {
                            return;
                        }
                        const offsetLength = e.clientX - progressElement.getBoundingClientRect().left;
                        const newValue = calculateProgress(offsetLength);
                        props.onChange(newValue, 'click');
                    }}
                >
                    <div
                        class="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 h-2"
                        style={{
                            width: progressbarWidth(),
                        }}
                        role="progressbar"
                        aria-label={props.label}
                        aria-valuenow={props.value + ''}
                        aria-valuemin={props.min + ''}
                        aria-valuemax={props.max + ''}
                        ref={progressBarElement}
                    ></div>
                </div>
                <div
                    class="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
                    style={{
                        left: progressbarWidth(),
                    }}
                    onPointerDown={e => {
                        progressBarElement.classList.remove('transition-all');
                        draggerElement.classList.remove('transition-all');
                        setControlInfo({
                            isDragging: true,
                            startX: e.clientX,
                            progressBarWidth: progressBarElement.offsetWidth,
                        });
                    }}
                    ref={draggerElement}
                >
                    <div class="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                </div>
            </div>
            <Show when={props.helperText1 || props.helperText2}>
                <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
                    <div class="text-cyan-500 transition-all duration-500 dark:text-slate-100">{props.helperText1}</div>
                    <div class="text-slate-500 transition-all duration-500 dark:text-slate-400">
                        {props.helperText2}
                    </div>
                </div>
            </Show>
        </div>
    );
}
