import { InstanceScope, Scope } from '@vgerbot/ioc';
import { Signal } from '@vgerbot/solidium';
import { ProgressProps } from './Props';
import { createEffect } from 'solid-js';

@Scope(InstanceScope.TRANSIENT)
export class SliderModel {
    progressBarElement!: HTMLDivElement;
    progressElement!: HTMLDivElement;
    draggerElement!: HTMLDivElement;
    draggingInfo = {
        started: false,
        clientPosition: 0,
        progressBarWidth: 0,
    };
    @Signal
    value!: number;
    min: number = 0;
    max: number = 0;

    resolveNewCSSProgressBarWidth() {
        return Math.min(1, this.value / (this.max - this.min)) * 100 + '%';
    }
    init(props: ProgressProps) {
        createEffect(() => {
            this.value = props.value;
        });
        createEffect(() => {
            this.min = props.min;
            this.max = props.max;
        });
    }

    updateByPos(pos: number) {
        const tempValue = this.calculateValue(pos);
        this.value = Math.round(tempValue * 100) / 100;
    }
    private calculateValue(progressBarWidth: number) {
        const ratio = Math.min(1, Math.max(0, progressBarWidth) / this.progressElement.offsetWidth);
        return (this.max - this.min) * ratio;
    }
    startDrag(e: PointerEvent) {
        this.draggingInfo.started = true;
        this.draggingInfo.clientPosition = e.clientX;
        this.draggingInfo.progressBarWidth = this.progressBarElement.offsetWidth;
    }
    handleDragEvent(e: PointerEvent) {
        if (!this.draggingInfo.started) {
            return;
        }
        const deltaX = e.clientX - this.draggingInfo.clientPosition;
        const progresBarWidth = this.draggingInfo.progressBarWidth + deltaX;
        this.updateByPos(progresBarWidth);
    }
    stopDrag() {
        this.draggingInfo.started = false;
    }
}
