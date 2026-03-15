export function Pnl() {
	return (
		<section className="w-full rounded-xl border border-neutral-800 bg-linear-to-b from-neutral-900 to-neutral-950 p-4">
			<div className="flex items-start justify-between">
				<p className="text-3xl font-semibold text-neutral-100">
					$0.00 <span className="text-3xl font-medium text-neutral-400">0 LIMBO</span>
				</p>
				<span className="text-4xl leading-none text-neutral-300">-</span>
			</div>

			<div className="mt-1 flex items-center justify-between text-3xl">
				<p className="text-neutral-300">
					Position <span className="text-emerald-300">↗ Trades</span>
				</p>
				<p className="text-neutral-300">Profit/Loss</p>
			</div>

			<div className="mt-4 h-2 w-full rounded-full bg-neutral-600">
				<div className="relative h-full w-full rounded-full">
					<span className="absolute left-0 top-1/2 h-2 w-1 -translate-y-1/2 rounded-full bg-pink-500" />
					<span className="absolute left-1/2 top-1/2 h-2 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-400" />
					<span className="absolute right-0 top-1/2 h-2 w-1 -translate-y-1/2 rounded-full bg-emerald-400" />
				</div>
			</div>

			<p className="mt-3 text-3xl text-neutral-300">Profit indicator</p>
		</section>
	);
}
