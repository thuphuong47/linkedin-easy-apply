LinkedIn Easy Apply Automation (Playwright + TypeScript)

Automates the LinkedIn Easy Apply job application flow using Playwright.

Note: This project uses mock login for security and compliance with LinkedIn's Terms of Service. No real credentials or login requests are performed.

🚀 Features

✅ Chrome, Edge, and mobile emulation

✅ Multi-user session mocking (simulate login)

✅ Resume upload & validation

✅ Auto form-filling with validation checks

✅ GitHub Actions CI/CD Integration

📁 Project Structure

├── .github/workflows/       # CI/CD configs
├── helpers/                 # Mocked login & form helpers
├── storage/                 # (Mocked) login session per user
├── tests/                   # Main Playwright test files
├── utils/                   # Logging, step reporting
├── .env.example             # Environment variable template
├── login.setup.ts          # Simulated multi-user login setup
├── playwright.config.ts    # Playwright config (multi-browser)
└── README.md                # You're here

⚙️ Setup Instructions

# 1. Clone the repo
git clone https://github.com/thuphuong47/linkedin-easy-apply.git
cd linkedin-easy-apply

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

⚠️ This project uses mock login by default. No actual credentials are required.

🧪 Run Tests

# Run with mocked login (default)
MOCK_LOGIN=true npx playwright test

# Run specific browser
MOCK_LOGIN=true npx playwright test --project=chrome

# View report
npx playwright show-report

🤖 CI/CD Integration

This project includes a GitHub Actions workflow to run tests on push/PR to main.

📁 .github/workflows/ci.yml

📎 Disclaimer

This project is for educational and testing purposes only.No real login or interaction with LinkedIn servers is performed.Mocking is used to simulate the Easy Apply flow safely.

🙋‍♀️ Author

Built by @thuphuong47 for interview automation assignment.

