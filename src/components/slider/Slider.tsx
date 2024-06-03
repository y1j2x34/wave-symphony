import { WindowEventListener } from '@solid-primitives/event-listener';
import { useService } from '@vgerbot/solidium';
import { Show } from 'solid-js';
import { SliderModel } from './SliderModel';
import { ProgressProps } from './Props';

export function Slider(props: ProgressProps) {
    const model = useService(SliderModel);
    model.init(props);
    return (
        <div
            class="space-y-2 select-none"
            onWheel={e => {
                const wheelOffset = props.wheelOffset;
                let offset = 0;
                if (typeof wheelOffset === 'function') {
                    offset = wheelOffset(e);
                } else if (typeof wheelOffset === 'number') {
                    const unit = e.deltaY < 0 ? -1 : 1;
                    offset = Math.abs(wheelOffset) * unit * (e.shiftKey ? 10 : 1);
                } else {
                    offset = e.deltaY;
                }
                const newProgressBarWidth = model.progressBarElement.offsetWidth + offset;
                model.updateByPos(newProgressBarWidth);
                props.onChange(model.value, 'wheel');
                e.preventDefault();
            }}
        >
            <WindowEventListener
                onPointermove={e => {
                    if (!model.draggingInfo.started) {
                        return;
                    }
                    model.handleDragEvent(e);
                    props.onChange(model.value, 'drag');
                }}
                onPointerup={() => {
                    model.stopDrag();
                }}
            ></WindowEventListener>
            <div class="relative">
                <div
                    class="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"
                    ref={model.progressElement}
                    onClick={e => {
                        if (e.button !== 0) {
                            return;
                        }
                        const left = model.progressBarElement.getBoundingClientRect().left;
                        const progressBarWidth = e.clientX - left;
                        model.updateByPos(progressBarWidth);
                        props.onChange(model.value, 'click');
                    }}
                >
                    <div
                        class="bg-cyan-500 dark:bg-cyan-400 h-2"
                        style={{
                            width: model.resolveNewCSSProgressBarWidth(),
                        }}
                        role="progressbar"
                        aria-label={props.label}
                        aria-valuenow={props.value + ''}
                        aria-valuemin={props.min + ''}
                        aria-valuemax={props.max + ''}
                        ref={model.progressBarElement}
                    ></div>
                </div>
                <div
                    class="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
                    style={{
                        left: model.resolveNewCSSProgressBarWidth(),
                    }}
                    onPointerDown={e => {
                        model.startDrag(e);
                    }}
                    ref={model.draggerElement}
                >
                    <div class="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
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
