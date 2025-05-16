# Insurance Quote API + Angular UI

This is a simple ASP.NET Core Web API with an Angular frontend that simulates a mock insurance premium quoting service for Assumption Life's developer assignment.

---

## 🧪 Features

### Backend (ASP.NET Core)

- **POST /api/quote**: Submit a quote request (`term` + `sumInsured`) → returns a unique quote ID.
- **GET /api/quote/{id}**: Retrieve quote details + 4 premium estimates from different mock companies.
- Premiums are generated with a randomized base rate (0.25% to 0.5% of sum insured).
- In-memory only — quote results last as long as the app runs.
- CORS enabled for `http://localhost:4200`

### Frontend (Angular)

- Form to enter quote info
- Displays result and all previous quotes during session
- Styled lightly for usability

---

## 📦 Technologies Used

- .NET 6 (Minimal API)
- Angular 16
- Swagger UI

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/scormier89/insurance-quote-api.git
cd QuotingService
```

### 2. Run the Backend

```bash
cd QuotingService/QuotingService
dotnet run
```

- Should run on: `https://localhost:5001`
- Swagger UI available at: `https://localhost:5001/swagger`

### 3. Run the Angular Frontend

```bash
cd QuotingServiceUI
npm install
ng serve
```

- Navigate to: `http://localhost:4200`

> You must keep both backend (`:5001`) and frontend (`:4200`) running.

---

## 💡 Sample Requests

### POST `/api/quote`

```json
{
  "term": 20,
  "sumInsured": 100000
}
```

Returns:

```json
{ "id": "abcd-1234-5678-efgh" }
```

### GET `/api/quote/{id}`

```json
{
  "id": "abcd-1234-5678-efgh",
  "term": 20,
  "sumInsured": 100000,
  "premiums": [
    { "companyCode": "Assumption Life", "premium": 387.65 },
    { "companyCode": "Medavie BlueCross", "premium": 405.12 },
    ...
  ]
}
```

---

## 📝 Notes

- Premiums are mocked and randomly generated for demo purposes
- CORS is pre-configured to allow Angular to access the API
- This project is self-contained and has no external DB or hosting dependencies

---

## 🧠 If I Had More Time...

- Add localStorage persistence to keep quotes across refreshes
- Add UI validation and better formatting
- Add unit + integration tests
- Add authentication or quote history by user

---

Submission for Assumption Life’s technical evaluation.

MIT License
