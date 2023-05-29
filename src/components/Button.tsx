export interface ButtonProps {
    text: string;
    submit?: boolean;
}

export const Button = ({ text, submit = false }: ButtonProps) => (
    <button
        className="bg-emerald-300 hover:bg-emerald-400 dark:bg-orange-700 hover:dark:bg-orange-800 dark:text-white text-base sm:text-xl font-bold pt-2 pb-2 pl-4 pr-4 rounded-lg shadow"
        type={submit ? 'submit' : 'button'}
    >
        {text}
    </button>
);
