import { createMuiTheme } from '@material-ui/core/styles';
import typography from './typography';
import overrides from './overrides';
import palette from './palette';
const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
