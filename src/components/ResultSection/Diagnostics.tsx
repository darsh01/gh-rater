import React from 'react';
import { useSelector } from 'react-redux';
import { getStates } from '../../selectors';
import RateIcon from './RateIcon';

const Diagnostics: React.FC = () => {
  const { rating, starred, user } = useSelector(getStates);

  const toggleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.children[2].classList.toggle('show');
    }
  };

  const diagnosticsList = () => {
    if (rating) {
      const diagnostics = rating.filter((r) => r.Score < 0);

      return diagnostics.map((r, index) => (
        <li key={index}>
          <div role="button" className="expand" tabIndex={index} onClick={toggleExpand}>
            <RateIcon rate={r.Score} /> {r.Name}{' '}
            <span className="muted audit_text bold">{r.Suggestions?.length} found</span>
            {starred && (
              <div
                className="data"
                dangerouslySetInnerHTML={{
                  __html: r.Message + (r.Suggestions ? `\n\nResources:\n• ${r.Suggestions.join('\n• ')}` : ''),
                }}
              />
            )}
          </div>
        </li>
      ));
    }

    return [];
  };

  if (diagnosticsList().length > 0) {
    return (
      <div className="audits">
        <h4>
          Diagnostics{' '}
          <span className="muted audit_text">These numbers don&rsquo;t directly affect the rating score.</span>
        </h4>
        {!starred && (
          <div className="block-message">
            <h3>
              {user && user.login} should star{' '}
              <a href="https://github.com/darsh01/gh-rater" target="_blank" rel="noreferrer">
                GitHub Rater&rsquo;s repository at GitHub
              </a>{' '}
              to view opportunities that can improve GitHub rating efficiently!
            </h3>
          </div>
        )}
        <div className={`audit_result ${!starred ? ' blocked' : ''}`}>
          <ul>{diagnosticsList()}</ul>
        </div>
      </div>
    );
  }

  return null;
};

export default Diagnostics;
