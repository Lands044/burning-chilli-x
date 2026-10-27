import { DEFAULT_CONFIG as CORE_DEFAULTS } from '@js/config/defaults.js'

// Game-specific defaults for the slot machine, merged on top of the core shape
// (texts/cta/sound/dev). Structural values tied to the CSS grid (columns/rows per
// breakpoint, icon count, icon heights) and animation timings stay hardcoded in
// index.js — only values that don't affect layout are config-driven.
//
// Named game.defaults.js (not defaults.js) deliberately: the core kit already
// installs its own src/js/config/defaults.js at that exact path.
export const DEFAULT_CONFIG = {
	...CORE_DEFAULTS,

	game: {
		balance: 1000.00,
		bet: 1.20,
		betStep: 0.60,
		minBet: 0.60,
		maxBet: 48.00,

		// Scripted spin outcomes, in order. Each entry's `result` is a per-column
		// array of icon numbers (1-8) — its shape must match the game's grid
		// (5 columns x 4 rows on desktop, 3x3 on mobile), so the icon layout itself
		// is not config-driven, only which numbers/amounts appear. `winLine` holds
		// the winning row index per column (null = no icon on the line).
		spins: {
			desktop: [
				{
					type: 'loss',
					winAmount: 0,
					winLine: null,
					result: [
						[2, 4, 1, 7],
						[3, 5, 2, 8],
						[1, 7, 4, 3],
						[6, 2, 5, 1],
						[4, 1, 3, 6]
					]
				},
				{
					type: 'smallwin',
					winAmount: 50,
					winLine: [1, 1, 1, 1, null],
					result: [
						[1, 3, 4, 5],
						[7, 3, 8, 2],
						[4, 3, 1, 8],
						[2, 3, 4, 6],
						[5, 6, 7, 3]
					]
				},
				{
					type: 'bigwin',
					winAmount: 150,
					winLine: [1, 1, 2, 2, 3],
					result: [
						[2, 8, 4, 7],
						[5, 8, 2, 1],
						[3, 4, 8, 4],
						[1, 4, 8, 6],
						[5, 3, 6, 8]
					]
				}
			],
			mobile: [
				{
					type: 'loss',
					winAmount: 0,
					winLine: null,
					result: [
						[4, 1, 7],
						[5, 2, 8],
						[7, 4, 3]
					]
				},
				{
					type: 'smallwin',
					winAmount: 50,
					winLine: [1, 1, 1],
					result: [
						[2, 3, 5],
						[7, 3, 2],
						[4, 3, 8]
					]
				},
				{
					type: 'bigwin',
					winAmount: 150,
					winLine: [2, 1, 1],
					result: [
						[1, 5, 8],
						[3, 8, 2],
						[2, 8, 4]
					]
				}
			]
		}
	},

	// actionButton/rotateNotice from CORE_DEFAULTS.texts are dropped — this game
	// has no single action button (spin/auto are image buttons) and no
	// rotate-to-portrait overlay, so neither field is read anywhere (see
	// docs/config.md, "No dead or hidden fields").
	texts: (({ actionButton, rotateNotice, ...rest }) => ({
		...rest,
		popupTitle: "Congratulations!",
		popupText: "Ready to continue playing?",
		ctaButton: "Download Now",
		linesTitle: "Lines",
		bestWin: "Best Win",
		// HTML: the <span> moves "Multiplier" onto its own styled line.
		bestMultiplier: "Best <span>Multiplier</span>",
		balanceLabel: "Balance",
		betLabel: "Total bet",
		currency: "FUN"
	}))(CORE_DEFAULTS.texts),

	// The original popup button had href="#" — kept so nothing changes until a
	// real link is set.
	cta: {
		...CORE_DEFAULTS.cta,
		url: "#"
	},

	assets: {
		...CORE_DEFAULTS.assets,
		logo: "logo",
		background: "bg",
		sounds: {
			spin: "spin",
			win: "win",
			select: "select"
		}
	}
}
