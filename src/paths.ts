import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@app': `${__dirname}`,
  '@core': `${__dirname}/core`,
  '@database': `${__dirname}/database`
});