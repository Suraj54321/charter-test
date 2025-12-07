# charter-test

✔ View customers and their monthly reward points
✔ Search customers by name
✔ Sort customers by total rewards or alphabetical order
✔ Pagination with next/previous navigation
✔ Export individual customer transactions as a downloadable PDF
✔ Fully tested using Vitest with mocked data
✔ Reward points calculated based on business logic
✔ Clean UI with responsive layout


🚀 Getting Started

1. Clone the repository
    <li><ul>git clone https://github.com/your-repo/reward-dashboard.git</ul></li>
    cd reward-dashboard

2. Install dependencies
    npm install

3. Start the development server
    npm run dev

Your app will be available at:

👉 http://localhost:5173

📊 Viewing Customers & Reward Points

When you open the application, you will see the Customers List screen:

Example UI

(replace when screenshot ready)

-------------------------
|  Customer List        |
-------------------------
| John Doe   | Rewards: 120 |
| Sarah Lee  | Rewards: 200 |
| Mike Ross  | Rewards: 75  |
-------------------------


Each customer card displays:

Customer Name

Total Reward Points

Button to view detailed transactions

Button to download customer PDF

🧮 Reward Calculation Logic

The reward system follows:

1 point for every dollar spent over $50

2 points for every dollar spent over $100

Example:

Transaction Amount	Points Awarded
$120	(100–50) ×1 + (120–100) ×2 = 90 points
$70	(70–50) ×1 = 20 points
$45	0 points

All customers in /src/data/transactions.js use this calculation.

🔍 Searching Customers

At the top of the page, you'll find the search bar.

How it works:

Type at least one character

List auto-updates

Search is case-insensitive

Exact match, partial match, fuzzy patterns supported

Example:

Typing "jo" will match:

John Carter

Jordan Lee

Joana Smith

Reset Search

A Reset button will appear when search is applied.

Clicking Reset:

Clears the search input

Restores full customer list

Resets pagination to page 1

↕ Sorting Customers

Sorting options are available in the dropdown above customer cards.

Available Sort Options:

Name (A–Z)

Name (Z–A)

Rewards (Low → High)

Rewards (High → Low)

Sorting happens instantly on the list that is currently loaded (search+pagination aware).

📄 PDF Download

Every customer card includes a Download PDF button.

PDF contains:

Customer name

Complete transaction history

Individual transaction amounts

Generated reward points

Total reward summary

PDF is created using jsPDF and automatically downloaded.

📑 Pagination

List of customers is paginated for better UX.

Pagination Features:

✔ Next Page
✔ Previous Page
✔ Shows page numbers
✔ Works seamlessly with Search + Sort

Default:

5 customers per page

When you search or sort, pagination adjusts automatically.

🧪 Running Tests

All test files are located inside:

/tests


To execute test suite:

npm run test


Includes:

Reward logic tests

Customer component tests

Mocking tests using Vitest and spyOn

Real transaction data from /src/data/transactions.js

🛠 Project Structure
src/
 ├── components/
 │     ├── CustomerList.jsx
 │     ├── CustomerCard.jsx
 │     ├── RewardLogic.js
 │
 ├── data/
 │     └── transactions.js
 │
 ├── styles/
 │     └── main.css
 │
tests/
 ├── reward.test.js
 ├── customer.test.js

📥 Build for Production
npm run build


Output is generated in:

dist/



