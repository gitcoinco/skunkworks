import { combineReducers } from 'redux';

import filter from './filter';
import search from './search';
import wallpapers from './wallpapers';
import wallpaper from './wallpaper';
import upload from './upload';
import activity from './activity';
import linechart from './linechart';

export default combineReducers({
  filter,
  search,
  wallpapers,
  wallpaper,
  upload,
  activity,
  linechart,
});
