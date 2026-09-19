import { ApiAlert } from '@/components/common/api-alert'

export function TenderUnavailable({ message }: { message: string }) {
    return <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6"><ApiAlert message={message} retryHref="/browse" /></section>
}
