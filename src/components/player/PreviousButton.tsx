export function PreviousButton() {
    return (
        <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="Previous">
            <svg width="24" height="24" fill="none">
                <path
                    d="m10 12 8-6v12l-8-6Z"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
                <path
                    d="M6 6v12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </svg>
        </button>
    );
}
