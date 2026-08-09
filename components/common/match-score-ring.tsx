export function MatchScoreRing({ score, size = 56 }: { score: number; size?: number }) {
    const radius = 22
    const circumference = 2 * Math.PI * radius
    return (
        <div className="relative flex shrink-0 items-center justify-center" style={{ width: size, height: size }} aria-label={`${score}% AI match`}>
            <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden="true">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="var(--muted)" strokeWidth="3" />
                <circle cx="28" cy="28" r={radius} fill="none" stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${(score / 100) * circumference} ${circumference}`} transform="rotate(-90 28 28)" />
            </svg>
            <span className="absolute text-xs font-extrabold text-primary">{score}</span>
        </div>
    )
}
