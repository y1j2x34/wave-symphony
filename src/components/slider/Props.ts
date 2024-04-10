export interface ProgressProps {
    label: string;
    value: number;
    max: number;
    min: number;
    helperText1?: string;
    helperText2?: string;
    disabled?: boolean;
    wheelOffset?: number | ((e: WheelEvent) => number);
    onChange: (newValue: number, type: 'click' | 'drag' | 'wheel') => void;
}
