import React from 'react';
import ColorGradientProgressBar from './ColorGradientProgressBar';
import defaultPasswordScorer from './passwordScorer';

export default function PasswordStrengthIndicator({ scorer = defaultPasswordScorer, password, ...restProps }) {
  const strength = scorer.scoreFn(password);
  return <ColorGradientProgressBar currentVal={strength} minVal={0} maxVal={scorer.maxScore} {...restProps} />;
}
