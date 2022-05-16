import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { CodePreview } from 'docusaurus-plugin-code-preview';

/*
export default function Playground(props) {
  return (
    <CodePreview
      output={{
        outputs: [
          {
            name: 'JavaScript',
            value: 'javascript',
          },
          {
            name: 'React',
            value: 'react',
          },
          {
            name: 'Angular',
            value: 'angular',
          },
          {
            name: 'Vue',
            value: 'vue',
          },
        ],
        // This is the default selected option in the rendered component
        defaultOutput: 'javascript',
      }}
      // Your existing options
    />
  );
}
*/

export default function Playground(props) {
  return <CodePreview {...props} src={useBaseUrl(props.src)} />;
}
