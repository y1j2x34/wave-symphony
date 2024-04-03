export function NextButton() {
    return (
        <button class="hidden sm:block lg:hidden xl:block" aria-label="Next">
            <svg width="24" height="24" fill="none">
                <path
                    d="M14 12 6 6v12l8-6Z"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
                <path
                    d="M18 6v12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </svg>
        </button>
    );
}
