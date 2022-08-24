---
hide_table_of_contents: true
pagination_next: getting-started/example
---

# Getting Started

["Tutorial"](./02-example.mdx) is a live example that covers general data
munging and data export to spreadsheets.

## Installation

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<https://cdn.sheetjs.com> is the primary software distribution site.  Please
read the installation instructions for your use case:

<ul>{useCurrentSidebarCategory().items.map((item, index) => {
  if(item.label != "Installation") return "";
  return item.items.map((item, index) => {
    const listyle = (item.customProps?.icon) ? {
      listStyleImage: `url("${item.customProps.icon}")`
    } : {};
    return (<li style={listyle} {...(item.customProps?.class ? {className: item.customProps.class}: {})}>
      <a href={item.href}>{item.label}</a>{item.customProps?.summary && (" - " + item.customProps.summary)}
    </li>);
  });
})}</ul>

