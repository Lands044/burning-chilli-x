import { DEFAULT_CONFIG } from '@js/config/game.defaults.js'

// Game-specific devmenu field groups, concatenated with CORE_FIELDS (texts/CTA/
// sound) in index.js. See src/js/config/devmenu.js in the core kit for the field
// shape ({ path, label, type, min/max/step, hint }).
//
// Only type/winAmount are editable here — result/winLine are per-column icon
// grids tied to the fixed desktop/mobile layouts (CSS-dependent), so they stay
// config.json-only. Field count is derived from DEFAULT_CONFIG.game.spins so the
// panel always matches the number of scripted spins.
const spinFields = (breakpoint, label) => DEFAULT_CONFIG.game.spins[breakpoint].map((spin, i) => [
	{ path: `game.spins.${breakpoint}.${i}.type`, label: `${label} #${i + 1}: тип`, type: 'text',
		hint: i === 0 ? 'loss / smallwin / bigwin' : undefined },
	{ path: `game.spins.${breakpoint}.${i}.winAmount`, label: `${label} #${i + 1}: сума виграшу`, type: 'number', min: 0, step: 1 }
]).flat()

export const GAME_FIELDS = [
	['Ставки', [
		{ path: 'game.balance', label: 'Баланс', type: 'number', min: 0, step: 1 },
		{ path: 'game.bet', label: 'Ставка', type: 'number', min: 0, step: 0.1 },
		{ path: 'game.betStep', label: 'Крок ставки', type: 'number', min: 0.1, step: 0.1 },
		{ path: 'game.minBet', label: 'Мін. ставка', type: 'number', min: 0, step: 0.1 },
		{ path: 'game.maxBet', label: 'Макс. ставка', type: 'number', min: 0, step: 0.1 }
	]],
	['Підписи', [
		{ path: 'texts.linesTitle', label: 'Заголовок Lines', type: 'text' },
		{ path: 'texts.balanceLabel', label: 'Підпис балансу', type: 'text' },
		{ path: 'texts.betLabel', label: 'Підпис ставки', type: 'text' },
		{ path: 'texts.currency', label: 'Валюта', type: 'text' }
	]],
	['Спіни — Desktop', spinFields('desktop', 'Спін')],
	['Спіни — Mobile', spinFields('mobile', 'Спін')]
]
