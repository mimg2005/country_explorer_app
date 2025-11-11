# Country Explorer 🌍

A modern and responsive React application designed to explore a comprehensive list of countries with powerful search and multilingual capabilities. Built with **Vite**, **React**, **Zustand** for state management, and styled using **Tailwind CSS**.

## ✨ Features

*   **Country List Display**: Fetches and displays a full list of countries from the `restcountries.com` public API, sorted alphabetically by the current language.
*   **Detailed Country Cards**: For each country, view:
    *   The **country flag**
    *   The **country name** (dynamically translated based on selected language)
    *   The **primary international dialing code**
*   **Dynamic Sorting**: Countries are automatically sorted alphabetically based on the currently selected language (English or Persian).
*   **Intelligent Search**: A responsive search bar allows users to filter countries by:
    *   **Country Name** (English or Persian, depending on the active language)
    *   **Dialing Code**
*   **Multilingual Support (English & Persian/Farsi)**:
    *   Seamless language toggling between English and Persian.
    *   **Right-to-Left (RTL)** layout for Persian, ensuring a natural reading experience.
    *   All UI texts and country names are translated.
*   **Clean & Responsive UI**: Designed with Tailwind CSS for a simple, modern, and mobile-friendly user experience, displaying up to 6 countries per row on large screens.
*   **Modular Architecture**: Organized into a clean, maintainable structure using React components, custom hooks, and a centralized Zustand store.
*   **IRANSans Font Integration**: Persian text is displayed using the aesthetically pleasing IRANSans font for better readability.

## 🚀 Technologies Used

*   **Frontend**: React (with Vite)
*   **State Management**: Zustand
*   **Styling**: Tailwind CSS
*   **Internationalization**: `react-i18next`, `i18next`
*   **API Client**: `fetch` (native browser API)
*   **Public API**: `https://restcountries.com/v3.1/all?fields=name,flags,idd,translations`
*   **Utility Hooks**: `useDebounce`

## 📦 Project Structure
```bash
country-app/
├── public/ # Static assets including fonts
├── src/
│ ├── api/ # API calls (e.g., fetchCountries)
│ ├── assets/ # Language translation files (en.json, fa.json)
│ ├── components/ # Reusable UI components (CountryCard, SearchBar, Header, LanguageToggle)
│ ├── hooks/ # Custom React hooks (useDebounce)
│ ├── store/ # Zustand stores for state management (useCountryStore, useLanguageStore)
│ ├── styles/ # Tailwind CSS configuration and global styles (including @font-face for IRANSans)
│ ├── utils/ # Utility functions and i18n setup
│ ├── App.jsx # Main application component
│ └── main.jsx # Entry point for React app
├── .github/ # GitHub Actions workflows
│ └── workflows/
│ └── deploy.yml # CI/CD for GitHub Pages deployment
├── tailwind.config.js # Tailwind CSS configuration (including custom fonts)
├── postcss.config.js # PostCSS configuration
└── package.json # Project dependencies and scripts
```

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mimg2005/country_explorer_app.git
    cd country_explorer_app
    ```
2.  **Add IRANSans Font Files:**
    Place your IRANSans font files (e.g., `.woff`, `.woff2`) into the `public/fonts/IRANSans/` directory. Ensure the filenames match those used in `src/styles/index.css`.
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 🌐 Deployment to GitHub Pages

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the application to GitHub Pages.

### Configuration for GitHub Pages:

*   **`package.json`**: If deploying to a project page (e.g., `username.github.io/repo-name`), ensure you have a `homepage` field:
    ```json
    "homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/",
    ```
*   **`vite.config.js`**: If deploying to a project page, set the `base` option to your repository name:
    ```javascript
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      base: '/YOUR_REPOSITORY_NAME/', // e.g., '/country-explorer/'
    });
    ```
    **Remember to replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name in both `package.json` and `vite.config.js`.**

Once configured and pushed to your `main` branch, the GitHub Actions workflow will handle the deployment. You can monitor its progress in the "Actions" tab of your GitHub repository.

---