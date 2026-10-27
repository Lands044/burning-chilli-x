import { setGameNormalizer, toNumber } from '@js/config/config.js'
import { DEFAULT_CONFIG } from './game.defaults.js'

// Validates a single scripted spin entry, falling back to the matching default
// entry (by index) when a field is missing or malformed — a partial config.json
// edit (e.g. only tweaking winAmount) should not corrupt the result grid.
function normalizeSpin(spin, fallback) {
	if (typeof spin !== 'object' || spin === null) return fallback

	const type = ['loss', 'smallwin', 'bigwin'].includes(spin.type) ? spin.type : fallback.type
	const winAmount = toNumber(spin.winAmount, fallback.winAmount)
	const winLine = Array.isArray(spin.winLine) || spin.winLine === null ? spin.winLine : fallback.winLine
	const result = Array.isArray(spin.result) && spin.result.length === fallback.result.length
		? spin.result
		: fallback.result

	return { type, winAmount, winLine, result }
}

function normalizeSpinList(list, fallbackList) {
	if (!Array.isArray(list) || list.length === 0) return fallbackList
	return list.map((spin, i) => normalizeSpin(spin, fallbackList[i % fallbackList.length]))
}

function normalizeGameConfig(config) {
	const game = config.game
	const defaults = DEFAULT_CONFIG.game

	game.balance = toNumber(game.balance, defaults.balance)
	game.bet = toNumber(game.bet, defaults.bet)
	game.betStep = toNumber(game.betStep, defaults.betStep)
	game.minBet = toNumber(game.minBet, defaults.minBet)
	game.maxBet = toNumber(game.maxBet, defaults.maxBet)

	game.spins = {
		desktop: normalizeSpinList(game.spins?.desktop, defaults.spins.desktop),
		mobile: normalizeSpinList(game.spins?.mobile, defaults.spins.mobile)
	}

	return config
}

export function registerGameConfig() {
	setGameNormalizer(normalizeGameConfig)
}
