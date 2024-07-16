import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
	current: {
		id: 1,
		colors: ['#4682B4', '#5F9EA0', '#ff5733', '#8B4513', '#778899'],
		locks: [false, false, false, false, false]
	},

	saved: [
		{
			id: 1,
			colors: ['#4682B4', '#5F9EA0', '#ff5733', '#8B4513', '#778899'],
			locks: [false, false, false, false, false]
		}
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
				return locks.map((lock, ind) => {
					return lock ? colors[ind] : chroma.random().toString();
				});
			}
		},

		toggleLock: (state, action) => {
			const ind = action.payload;
			const lock = state.current.locks[ind];
			state.current.locks[ind] = !lock;
		}
	}
});

export const { generate, toggleLock } = colorsSlice.actions;

export default colorsSlice.reducer;

export const selectCurrentColors = (state) => state.colors.current;
export const selectSavedColors = (state) => state.colors.saved;