import { createSlice, nanoid } from '@reduxjs/toolkit';
import Storage, { LocalStorage } from '../../storage.js';

const lstore = new LocalStorage();

const initialState = {
	current: {
		id: 1,
		colors: getInitialColors(),
		locks: [false, false, false, false, false]
	},

	saved: [
		// {
		// 	id: 1,
		// 	colors: ['#4682B4', '#5F9EA0', '#ff5733', '#8B4513', '#778899'],
		// 	locks: [false, false, false, false, false]
		// },
		// {
		// 	id: 2,
		// 	colors: ['#3682B4', '#549EA0', '#f65733', '#1B4513', '#758899'],
		// 	locks: [false, false, false, false, false]
		// },
		...downloadSavedColors()
	]
};

export const colorsSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {
		generate: {
			reducer(state, action) {
				state.current.colors = action.payload;
			},
			prepare(colors, locks) {
				const newColors = locks.map((lock, ind) => {
					return lock ? colors[ind] : chroma.random().toString();
				});

				Storage.updateColorsHash(newColors);

				return {
					payload: newColors
				}
			}
		},

		toggleLock: (state, action) => {
			const ind = action.payload;
			const lock = state.current.locks[ind];
			state.current.locks[ind] = !lock;
		},

		pickColors: {
			reducer(state, action) {
				state.current.colors = action.payload;
				state.current.locks = [false, false, false, false, false];
			},
			prepare(colors) {
				Storage.updateColorsHash(colors);
				return {
					payload: colors
				};
			}
		},

		updateColors: {
			reducer(state, action) {
				const { color1, color2 } = action.payload;
				const ind1 = state.current.colors.indexOf(color1);
				const ind2 = state.current.colors.indexOf(color2);
				const lock1 = state.current.locks[ind1];
				const lock2 = state.current.locks[ind2];
				state.current.colors[ind1] = color2;
				state.current.colors[ind2] = color1;
				state.current.locks[ind1] = lock2;
				state.current.locks[ind2] = lock1;

				Storage.updateColorsHash(state.current.colors);
			},
			prepare(color1, color2) {
				return {
					payload: { color1, color2 }
				}
			}
		},

		removeColors: {
			reducer(state, action) {
				const colors = action.payload;
				const ind = state.saved.findIndex(set => set.colors.join('') === colors.join(''));
				state.saved.splice(ind, 1);
			},
			prepare(colors_str) {
				lstore.remove(colors_str);
				return {
					payload: colors_str.split('-')
				};	
			}
		},

		saveCurrentColors: {
			reducer(state, action) {
				state.saved = action.payload;
			},
			prepare() {
				lstore.save();
				return {
					payload: downloadSavedColors()
				}
			}
		},

		removeAllSavedColors: {
			reducer(state) {
				state.saved = [];
			},
			prepare() {
				lstore.clear();
				return {};
			}
		}
	}
});

export const { generate, toggleLock, pickColors,
	updateColors, removeColors, saveCurrentColors, removeAllSavedColors } = colorsSlice.actions;

export default colorsSlice.reducer;

export const selectCurrentColors = (state) => state.colors.current;
export const selectSavedColors = (state) => state.colors.saved;
export const selectSavedColorsHashes = (state) => state.colors.saved.map(set => set.colors);


function getInitialColors() {
	const colors = Storage.getColorsFromHash();
	if (!colors.length) {
		for (let i = 0; i < 5; i += 1) {
			colors.push(chroma.random().toString());
		}
	}
	Storage.updateColorsHash(colors);
	return colors;
}

function downloadSavedColors() {
	let colorsList = lstore.download();
	return Object.values(colorsList).map((colors, ind) => ({
		id: ind,
		colors,
		locks: [false, false, false, false, false]
	}));
}