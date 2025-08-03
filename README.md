# LinkedIn Easy Apply Automation (Playwright + TypeScript)

Automates the LinkedIn Easy Apply job application flow using Playwright.

## 🚀 Features

- ✅ Chrome, Edge, and mobile emulation
- ✅ Multi-user session storage (simulate multiple logins)
- ✅ Resume upload & validation
- ✅ Auto form-filling with validation checks
- ✅ GitHub Actions CI/CD Integration

## 📁 Project Structure
├── .github/workflows/ # CI/CD configs
├── helpers/ # Support utilities (selectors, form handling)
├── storage/ # Playwright login storage per user
├── tests/ # Main test files (Easy Apply)
├── utils/ # Logger, config loader, etc.
├── .env # User credentials (excluded from Git)
├── login.setup.ts # Multi-user login + storage file
├── playwright.config.ts # Playwright project config
└── README.md # You're here

## ⚙️ Setup Instructions

### 1. Clone this repository
git clone https://github.com/thuphuong47/linkedin-easy-apply.git
cd linkedin-easy-apply

2. Install dependencies
npm install

3. Add environment variables
Create a .env file at the root:
USERNAME1=your_email1
PASSWORD1=your_password1

USERNAME2=your_email2
PASSWORD2=your_password2
Or use the provided .env.example file as a template.

🧪 Run Tests
1. Save login sessions
npx ts-node login.setup.ts
This will log in users and store sessions to /storage.

2. Run tests (default browser)
npx playwright test
Run specific test file

npx playwright test tests/easy-apply.spec.ts
Optional: Run in headed mode

npx playwright test --headed
🤖 CI/CD Integration
This project includes a sample GitHub Actions workflow:

.github/workflows/ci.yml
Automatically runs tests on push or pull request to main.

🛡️ License
This project is licensed under the MIT License.

🙌 Contributing
Contributions welcome! Feel free to:
Open issues for bugs or enhancements
Submit PRs with improvements or new features
Fork and experiment!

💼 Author
@thuphuong47

📎 Disclaimer

This project is for educational and testing purposes only. Automated interactions with LinkedIn may violate their terms of service.
