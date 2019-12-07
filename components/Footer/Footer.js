import React from 'react';

import { Constraint } from '../Constraint';
import { withTheme } from 'emotion-theming';

const Footer = ({ theme }) => (
  <footer
    style={{
      backgroundColor: theme.colors.yellow,
    }}
  >
    <Constraint>
      <div
        style={{
          height: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSepMfctlDO-enGUdrEXObNgiBha63f5Kmkc-70s3ZOQhnbG4w/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '1.5rem',
          }}
        >
          Suggest a studio
        </a>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: `4rem`,
          textAlign: 'center',
          fontSize: '0.8rem',
        }}
      >
        <span>
          A project by <a>Jamin Galea</a>
        </span>
        <span>
          Built by <a>Steve Burtenshaw</a>
        </span>
        <span>
          <a>@DesignStudioDir</a>
        </span>
      </div>
    </Constraint>
  </footer>
);

export default withTheme(Footer);
