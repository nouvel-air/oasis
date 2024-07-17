import { createPasswordScorer, defaultPasswordScorerOptions } from '@semapps/auth-provider';

export default createPasswordScorer(defaultPasswordScorerOptions, 3);
