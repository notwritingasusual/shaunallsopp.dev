# Pages

This directory contains page-level components.

## Structure

```
pages/
├── Home.jsx
├── About.jsx
├── Projects.jsx
├── Contact.jsx
└── ...
```

## Example Page

```jsx
function HomePage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold">Home Page</h1>
      {/* Page content */}
    </div>
  );
}

export default HomePage;
```
