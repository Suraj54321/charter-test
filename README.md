<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Customer Rewards Dashboard - Documentation</title>
</head>
<body>

<h1>🏆 Customer Rewards Dashboard</h1>

<p>A React-based dashboard that displays customer transactions, calculates reward points, supports search, sorting, pagination, and allows PDF download of customer transaction reports.</p>

<hr>

<h2>📌 Table of Contents</h2>
<ul>
  <li><a href="#overview">Overview</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#project-setup">Project Setup</a></li>
  <li><a href="#running-the-app">Running the App</a></li>
  <li><a href="#viewing-customers-rewards">Viewing Customers & Rewards</a></li>
  <li><a href="#reward-calculation-logic">Reward Calculation Logic</a></li>
  <li><a href="#search-customers">Search Customers</a></li>
  <li><a href="#reset-search">Reset Search</a></li>
  <li><a href="#sorting-customers">Sorting Customers</a></li>
  <li><a href="#pagination">Pagination</a></li>
  <li><a href="#download-pdf">Download PDF</a></li>
  <li><a href="#running-tests">Running Tests</a></li>
  <li><a href="#project-structure">Project Structure</a></li>
</ul>

<hr>

<h2 id="overview">📘 Overview</h2>
<p>This project is a simple and clean <strong>Reward Points Dashboard</strong> used by retailers to track customer purchases and reward points.</p>

<hr>

<h2 id="features">✨ Features</h2>
<ul>
  <li>View customer list with total rewards</li>
  <li>View individual transaction history</li>
  <li>Search customers by name</li>
  <li>Sort customers</li>
  <li>Pagination</li>
  <li>Export customer report as PDF</li>
  <li>Well-tested reward point logic</li>
  <li>Clean UI with responsive layout</li>
</ul>

<hr>

<h2 id="project-setup">🛠 Project Setup</h2>

<h3>1️⃣ Install Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>2️⃣ Start Development Server</h3>
<pre><code>npm run dev</code></pre>

<p>The app will open at:</p>
<p><strong>👉 http://localhost:5173</strong></p>

<hr>

<h2 id="viewing-customers-rewards">👀 Viewing Customers & Rewards</h2>

<p>When the app loads, you will see:</p>

<ul>
  <li>Customer Name</li>
  <li>Total Reward Points</li>
  <li>Buttons:
    <ul>
      <li>View Transactions</li>
      <li>Download PDF</li>
    </ul>
  </li>
</ul>

<div class="box">
<pre>
---------------------------------------
| John Doe     | Total Rewards: 120   |
|--------------------------------------|
| Sarah Lee    | Total Rewards: 200   |
|--------------------------------------|
| Mike Ross    | Total Rewards: 75    |
---------------------------------------
</pre>
</div>

<hr>

<h2 id="reward-calculation-logic">🧮 Reward Calculation Logic</h2>

<p>The reward rules are:</p>

<table border="1" cellpadding="8">
  <tr>
    <th>Transaction Amount</th>
    <th>Reward Points</th>
  </tr>
  <tr>
    <td>Amount > 100</td>
    <td>2 points per $1 above 100</td>
  </tr>
  <tr>
    <td>Amount > 50</td>
    <td>1 point per $1 above 50</td>
  </tr>
</table>

<h3>Example:</h3>

<p>If a user spends <strong>$120</strong>:</p>
<ul>
  <li>$50 → No points</li>
  <li>$50 to $100 → 50 × 1 = 50 points</li>
  <li>Above $100 → 20 × 2 = 40 points</li>
</ul>

<p><strong>Total = 90 points</strong></p>

<hr>

<h2 id="search-customers">🔍 Search Customers</h2>

<p>The search bar allows customers to be filtered by name.</p>

<h3>How it works:</h3>
<ul>
  <li>Click the search button to execute search</li>
  <li>Case-insensitive</li>
  <li>Supports partial matches</li>
</ul>

<h3>Example:</h3>
<p>Typing <strong>"jo"</strong> will match:</p>
<ul>
  <li>John</li>
  <li>Jordan</li>
  <li>Joana</li>
</ul>

<hr>

<h2 id="reset-search">♻ Reset Search</h2>

<p>The reset button will:</p>
<ul>
  <li>Clear the search text</li>
  <li>Show full customer list again</li>
  <li>Return pagination to page 1</li>
</ul>

<hr>

<h2 id="sorting-customers">↕ Sorting Customers</h2>

<p>Sorting options include:</p>
<ul>
  <li>Name A → Z</li>
  <li>Name Z → A</li>
  <li>Rewards Low → High</li>
  <li>Rewards High → Low</li>
</ul>

<p>Sorting fully supports:</p>
<ul>
  <li>Search</li>
  <li>Pagination</li>
</ul>

<hr>

<h2 id="pagination">📑 Pagination</h2>

<p>Pagination allows navigation through customer pages.</p>

<ul>
  <li>Next Page</li>
  <li>Previous Page</li>
  <li>Page number indicators</li>
</ul>

<p><strong>Default:</strong> 5 customers per page</p>

<hr>

<h2 id="download-pdf">📄 Download PDF</h2>

<p>Each customer card has a <strong>Download PDF</strong> button.</p>

<p>PDF includes:</p>
<ul>
  <li>Customer details</li>
  <li>All transactions</li>
  <li>Reward per transaction</li>
  <li>Total reward summary</li>
</ul>

<hr>

<h2 id="running-tests">🧪 Running Tests</h2>

<p>All tests are placed inside:</p>

<pre><code>/tests</code></pre>

<p>Run test suite:</p>

<pre><code>npm run test</code></pre>

<p>Test suite includes:</p>
<ul>
  <li>Reward logic tests</li>
  <li>Customer card tests</li>
  <li>Mocking with Vitest</li>
  <li>Real data tests from <code>src/data/transactions.js</code></li>
</ul>

<hr>

<h2 id="project-structure">📂 Project Structure</h2>

<pre>
project/
│
├── src/
│   ├── components/
│   │   ├── CustomerList.jsx
│   │   ├── CustomerCard.jsx
│   │   ├── RewardLogic.js
│   │
│   ├── data/
│   │   └── transactions.js
│   │
│   ├── styles/
│   │   └── main.css
│
├── tests/
│   ├── reward.test.js
│   ├── customer.test.js
│
├── README.md
└── package.json
</pre>

<hr>

<h2>🎉 You're Ready to Use the App!</h2>
</body>
</html>
