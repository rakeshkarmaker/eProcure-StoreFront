const metrics = [
    ['Estimated value', '₹84.5 Cr', 'Est. contract value'], ['EMD amount', '₹1.69 Cr', 'Earnest money deposit'],
    ['Security deposit', '5%', 'Performance security'], ['Submission deadline', 'Mar 28, 2025', '14 days left'],
    ['Tender type', 'Open Tender', 'National competitive bid'], ['Procurement method', 'e-Procurement', 'Two-bid system'],
    ['Bid opening date', 'Apr 02, 2025', '10:00 AM IST'],
]

export function TenderMetrics() {
    return (
        <section className="max-w-full overflow-x-auto border-b bg-secondary/25">
            <div className="mx-auto flex min-w-max max-w-7xl divide-x">
                {metrics.map(([label, value, detail]) => <div key={label} className="px-5 py-4"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1.5 font-mono text-lg font-extrabold text-primary">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>)}
            </div>
        </section>
    )
}
