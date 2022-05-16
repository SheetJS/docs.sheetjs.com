import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'All the Data',
    Svg: require('@site/static/img/data.svg').default,
    description: (
      <>
        SheetJS presents a unified interface to every Excel file format as well
        as Lotus 1-2-3, Numbers, and Quattro Pro.  Process all the data!
      </>
    ),
    denouement: (
      <div className={styles.buttons}>
        <Link
          className="button button--secondary button--lg"
          to="/docs/miscellany/formats">
          File Details
        </Link>
      </div>
    ),
  },
  {
    title: 'All the Tools',
    Svg: require('@site/static/img/tools.svg').default,
    description: (
      <>
        SheetJS offers solutions for common data problems.  Unlock the power of
        JavaScript to wrangle data and effortlessly solve problems.
      </>
    ),
    denouement: (
      <div className={styles.buttons}>
        <Link
          className="button button--secondary button--lg"
          to="/docs/example">
          Complete Example
        </Link>
      </div>
    ),
  },
  {
    title: 'All the Places',
    Svg: require('@site/static/img/places.svg').default,
    description: (
      <>
        SheetJS runs everywhere: web browsers, servers, desktop apps, mobile
        apps, SalesForce and Photoshop plugins, even within Excel!
      </>
    ),
    denouement: (
      <div className={styles.buttons}>
        <Link
          className="button button--secondary button--lg"
          to="/docs/getting-started/demos">
          Demo Projects
        </Link>
      </div>
    ),
  },
];

function Feature({Svg, title, description, denouement}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {denouement && (<div className="text--center">{denouement}</div>)}
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
