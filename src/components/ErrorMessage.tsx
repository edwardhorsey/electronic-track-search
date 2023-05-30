export interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className="border border-red-400 shadow rounded-md p-4 max-w-sm w-full mx-auto text-center">
        <p>{message}</p>
    </div>
);
