import { configureStore } from '@reduxjs/toolkit';
import colorsReducer from '../features/colors/colorsSlice.js';

export default configureStore({
	reducer: {
		colors: colorsReducer
	}
});