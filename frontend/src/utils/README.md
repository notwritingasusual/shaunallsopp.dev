# Utilities

This directory contains utility functions and helpers.

## Structure

```
utils/
├── dateFormatter.js
├── constants.js
├── validators.js
└── ...
```

## Example Utility

```js
// dateFormatter.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// constants.js
export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const ITEMS_PER_PAGE = 10;
```
