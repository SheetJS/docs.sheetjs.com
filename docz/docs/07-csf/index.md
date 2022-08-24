---
pagination_next: api/index
hide_table_of_contents: true
title: Common Spreadsheet Format
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

The "Common Spreadsheet Format" (CSF) is the object model used by SheetJS. This
section covers the JS representation of workbooks, worksheets, cells, ranges,
addresses and other features.

### Contents

<ul>{useCurrentSidebarCategory().items.map(globalThis.lambda = (item, index) => {
  const listyle = (item.customProps?.icon) ? {
    listStyleImage: `url("${item.customProps.icon}")`
  } : {};
  return (<li style={listyle} {...(item.customProps?.class ? {className: item.customProps.class}: {})}>
    <a href={item.href}>{item.label}</a>{item.customProps?.summary && (" - " + item.customProps.summary)}
    <ul>{item.items && item.items.map(lambda)}</ul>
  </li>);
})}</ul>