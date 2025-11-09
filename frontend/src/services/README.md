# Services

This directory contains API service functions for communicating with the Django backend.

## Structure

```
services/
├── api.js           # Base API configuration
├── auth.js          # Authentication services
├── projects.js      # Projects API calls
└── ...
```

## Example Service

```js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects/`);
  return response.data;
};

export const getProject = async (id) => {
  const response = await axios.get(`${API_URL}/projects/${id}/`);
  return response.data;
};
```
