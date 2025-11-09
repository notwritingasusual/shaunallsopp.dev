# Apple Health Weight Graph - Complete Setup Guide

## 📋 Overview
This guide walks you through exporting your weight data from Apple Health and displaying it as a graph on your portfolio website.

---

## 📱 STEP 1: Export Data from iPhone

1. **Open Health App** on your iPhone
2. **Tap your Profile Picture** (top right corner)
3. **Scroll down** and tap **"Export All Health Data"**
4. **Confirm** the export (may take a few minutes)
5. **Share the ZIP file** to yourself:
   - AirDrop to your Mac, OR
   - Email to yourself, OR
   - Save to iCloud Drive
6. **Unzip the file** on your computer
   - You'll get a folder with `export.xml` (this is what we need!)

---

## 💻 STEP 2: Parse the XML Data

### Run the Python Script:

```bash
cd ~/shaunallsopp.dev/backend

# Make sure you've unzipped the export
# Assuming it's in ~/Downloads/apple_health_export/

python parse_health_data.py ~/Downloads/apple_health_export/export.xml
```

### What This Does:
- Extracts all weight records from the XML
- Averages multiple readings per day
- Creates two files:
  - `weight_data.json` (for Django)
  - `weight_data.csv` (for viewing in Excel/Numbers)

### Expected Output:
```
📂 Parsing /Users/you/Downloads/apple_health_export/export.xml...
✅ Found 245 weight records
📊 Averaged to 180 daily records
💾 Saved JSON: weight_data.json
💾 Saved CSV: weight_data.csv

📈 Summary Statistics:
   Total readings: 180
   Date range: 2024-05-01 to 2025-11-09
   Min weight: 78.5 kg
   Max weight: 85.2 kg
   Average: 81.34 kg
   Latest: 80.1 kg (2025-11-09)
```

---

## 🗄️ STEP 3: Create Database Migration

```bash
cd ~/shaunallsopp.dev/backend
source venv/bin/activate

# Create migration
python manage.py makemigrations

# Apply migration
python manage.py migrate
```

---

## 📥 STEP 4: Load Data into Django

```bash
cd ~/shaunallsopp.dev/backend
source venv/bin/activate

# Load the JSON data
python manage.py load_weight_data weight_data.json
```

### Expected Output:
```
📂 Loading data from weight_data.json...
✅ Found 180 records

✅ Successfully imported weight data!
   Created: 180 records
   Updated: 0 records
   Total: 180 records in database
```

---

## 🧪 STEP 5: Test the API

### Start Django Server:
```bash
cd ~/shaunallsopp.dev/backend
source venv/bin/activate
python manage.py runserver
```

### Test Endpoints:

```bash
# Get last 90 days
curl http://localhost:8000/api/health/weight

# Get last 30 days
curl http://localhost:8000/api/health/weight?days=30

# Get all data
curl http://localhost:8000/api/health/weight/all
```

### Or visit in browser:
- http://localhost:8000/api/health/weight
- http://localhost:8000/api/docs (interactive API docs)
- http://localhost:8000/admin (view in admin panel)

---

## ⚛️ STEP 6: Install Chart Library (React)

```bash
cd ~/shaunallsopp.dev/frontend

# Install Recharts (simple, lightweight)
npm install recharts
```

---

## 📊 STEP 7: Create React Component

Create `frontend/src/components/WeightGraph.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function WeightGraph() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(90);

  useEffect(() => {
    fetchData();
  }, [days]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/health/weight?days=${days}`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load weight data');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (data.length === 0) return <div className="text-center p-4">No data available</div>;

  const stats = {
    latest: data[data.length - 1]?.weight,
    min: Math.min(...data.map(d => d.weight)),
    max: Math.max(...data.map(d => d.weight)),
    avg: (data.reduce((sum, d) => sum + d.weight, 0) / data.length).toFixed(1)
  };

  return (
    <div className="border border-gray-300 p-6 font-mono">
      <h2 className="text-2xl font-bold mb-4">Weight Progress</h2>
      
      {/* Time period selector */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setDays(30)}
          className={`px-4 py-2 text-sm ${days === 30 ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          30 Days
        </button>
        <button 
          onClick={() => setDays(90)}
          className={`px-4 py-2 text-sm ${days === 90 ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          90 Days
        </button>
        <button 
          onClick={() => setDays(180)}
          className={`px-4 py-2 text-sm ${days === 180 ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          6 Months
        </button>
        <button 
          onClick={() => setDays(365)}
          className={`px-4 py-2 text-sm ${days === 365 ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          1 Year
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-600">Current</div>
          <div className="text-xl font-bold">{stats.latest} kg</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Average</div>
          <div className="text-xl font-bold">{stats.avg} kg</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Min</div>
          <div className="text-xl font-bold">{stats.min} kg</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Max</div>
          <div className="text-xl font-bold">{stats.max} kg</div>
        </div>
      </div>

      {/* Graph */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(date) => {
              const d = new Date(date);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
          />
          <YAxis 
            domain={['dataMin - 2', 'dataMax + 2']}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value) => [`${value} kg`, 'Weight']}
          />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="text-xs text-gray-500 mt-4">
        Data source: Apple Health | Last updated: {new Date(data[data.length - 1]?.date).toLocaleDateString()}
      </div>
    </div>
  );
}

export default WeightGraph;
```

---

## 🎨 STEP 8: Add to Your Page

In your `App.js` or wherever you want the graph:

```jsx
import WeightGraph from './components/WeightGraph';

function App() {
  return (
    <div className="App">
      <Header />
      
      {/* Add weight graph */}
      <div className="max-w-4xl mx-auto p-4 mt-10">
        <WeightGraph />
      </div>
      
      {/* Rest of your content */}
    </div>
  );
}
```

---

## 🔄 STEP 9: Updating Data (Future)

When you want to update with new weight data:

1. **Export from iPhone** (repeat Step 1)
2. **Parse the new export:**
   ```bash
   python parse_health_data.py ~/Downloads/new_export/export.xml
   ```
3. **Load into Django:**
   ```bash
   python manage.py load_weight_data weight_data.json
   ```
   (It will update existing dates and add new ones)

---

## 🎯 What You Get:

✅ **Interactive Graph** with weight trends  
✅ **Time period selector** (30 days, 90 days, 6 months, 1 year)  
✅ **Statistics** (current, average, min, max)  
✅ **Responsive design** (works on mobile)  
✅ **Clean API** for future features  
✅ **Django admin** to view/edit data  

---

## 🔒 Privacy Note:

This displays YOUR health data publicly on your portfolio. Consider:

1. **Is this okay?** - It's your personal choice
2. **Add authentication?** - Make the endpoint private
3. **Anonymize?** - Remove actual values, show trends only

To make it private, add authentication to the API endpoint.

---

## 🐛 Troubleshooting:

### No data showing?
```bash
# Check if data was imported
python manage.py shell
>>> from api.models import HealthWeight
>>> HealthWeight.objects.count()
>>> HealthWeight.objects.first()
```

### API not working?
- Make sure Django server is running
- Check CORS is configured for localhost:3000
- Check browser console for errors

### Graph not rendering?
- Make sure recharts is installed: `npm install recharts`
- Check browser console for errors
- Verify API returns data: http://localhost:8000/api/health/weight

---

**Done!** You now have an Apple Health weight graph on your portfolio! 🎉📊
