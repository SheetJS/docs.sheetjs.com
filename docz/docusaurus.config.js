// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SheetJS Community Edition',
  tagline: 'Get Sheet Done',
  url: 'https://docs.sheetjs.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //organizationName: 'sheetjs', // Usually your GitHub org/user name.
  //projectName: 'sheetjs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
            // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        //blog: {
        //  showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
            // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-36810333-1',
          anonymizeIP: true
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'SheetJS CE Docs',
        logo: {
          alt: 'SheetJS Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Docs',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://sheetjs.com',
            label: 'SheetJS',
            position: 'right',
          },
          {
            href: 'https://github.com/sheetjs/sheetjs',
            label: 'Source',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Intro',
                to: '/docs',
              },
              {
                label: 'Example',
                to: '/docs/getting-started/example',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              //{
              //  label: 'Stack Overflow',
              //  href: 'https://stackoverflow.com/questions/tagged/sheetjs',
              //},
              //{
              //  label: 'Discord',
              //  href: 'https://discordapp.com/invite/sheetjs',
              //},
              {
                label: 'Twitter',
                href: 'https://twitter.com/sheetjs',
              },
            ],
          },
          {
            title: 'More',
            items: [
              //{
              //  label: 'Blog',
              //  to: '/blog',
              //},
              {
                label: 'SheetJS Pro',
                href: 'https://sheetjs.com/pro',
              },
              {
                label: 'Source',
                href: 'https://github.com/sheetjs/sheetjs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SheetJS LLC.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [ "swift", "java" ],
      },
      liveCodeBlock: {
        playgroundPosition: 'top'
      }
    }),
  themes: [
    "@docusaurus/theme-live-codeblock"
  ],
  scripts: [
    {
      src: "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js",
      async: true
    }
  ],
  plugins: [
   require.resolve("@cmfcmf/docusaurus-search-local")
  ]
};

module.exports = config;
