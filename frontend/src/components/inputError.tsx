import { FieldError } from "react-hook-form"

export function InputError({
    error,
    message
}: {
    error?: FieldError,
    message?: string
}) {
    return (
        <>
            {
                error && (
                    <p className="mt-1 text-red-600 text-sm">
                        {`${message}`}
                    </p>
                )
            }
        </>
    )
}