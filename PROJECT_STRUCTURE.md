# QMR Frontend - Project Structure

## 🏗️ Recommended Project Structure

```
src/
├── api/                          # API and GraphQL related
│   ├── apollo/
│   │   ├── client.js            # Apollo Client configuration
│   │   └── queries.js           # All GraphQL queries
│   │   └── mutations.js         # All GraphQL mutations
│   └── constants.js             # API endpoints and constants
│
├── assets/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/                   # Reusable UI components
│   ├── auth/                    # Authentication components
│   │   ├── RequireAuth.jsx
│   │   ├── LoginForm.jsx
│   │   ├── LoginError.jsx
│   │   └── AuthDebug.jsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── Layout.jsx
│   │   ├── Sidebar/
│   │   │   ├── index.jsx
│   │   │   ├── SidebarMenu.jsx
│   │   │   └── SidebarItem.jsx
│   │   └── Header.jsx
│   │
│   ├── admin/                   # Admin-related components
│   │   ├── AdminForm/
│   │   │   ├── index.jsx
│   │   │   ├── AdminInputs.jsx
│   │   │   ├── PhoneInput.jsx
│   │   │   ├── DateInput.jsx
│   │   │   └── useAdminForm.js
│   │   │
│   │   ├── AdminTable/
│   │   │   ├── index.jsx
│   │   │   ├── AdminRow.jsx
│   │   │   ├── ToggleButton.jsx
│   │   │   └── DeleteButton.jsx
│   │   │
│   │   └── AdminSearch/
│   │       └── index.jsx
│   │
│   ├── common/                  # Common/shared components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Modal.jsx
│   │   └── Loading.jsx
│   │
│   └── ui/                      # UI-specific components
│       ├── DarkModeToggle.jsx
│       ├── LanguageSelector.jsx
│       └── ErrorBoundary.jsx
│
├── contexts/                    # React Context providers
│   ├── DarkModeContext.jsx
│   ├── AuthContext.jsx
│   └── LanguageContext.jsx
│
├── pages/                       # Page components
│   ├── Login/
│   │   ├── index.jsx
│   │   ├── LoginPage.jsx
│   │   └── useLogin.js
│   │
│   ├── Dashboard/
│   │   └── index.jsx
│   │
│   ├── Admins/
│   │   ├── index.jsx           # Admins list page
│   │   ├── AdminsList.jsx
│   │   ├── AddAdminModal.jsx
│   │   └── useAdmins.js
│   │
│   ├── Admin/
│   │   ├── index.jsx           # Admin detail page
│   │   ├── AdminDetails.jsx
│   │   └── useAdminDetails.js
│   │
│   └── ComingSoon/
│       └── index.jsx
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.js
│   ├── useDarkMode.js
│   ├── useLocalStorage.js
│   └── useForm.js
│
├── utils/                       # Utility functions
│   ├── validators.js
│   ├── formatters.js
│   ├── constants.js
│   ├── helpers.js
│   └── checkUser.js
│
├── config/                      # Configuration files
│   ├── i18n.js
│   └── routes.js
│
├── styles/                      # Global styles
│   ├── index.css
│   └── variables.css
│
├── App.jsx                      # Root component
└── main.jsx                     # Entry point
```

## 📝 File Organization Rules

### 1. **Folders by Feature**
- Group related files together
- Each feature has its own folder
- Use `index.js` for main exports

### 2. **Naming Conventions**
- Components: `PascalCase.jsx`
- Hooks: `useCamelCase.js`
- Utilities: `camelCase.js`
- Constants: `CONSTANT_CASE.js`

### 3. **Component Structure**
```
ComponentName/
├── index.jsx          # Main component
├── ComponentName.jsx  # Implementation
├── useComponentName.js # Custom hooks
├── ComponentName.css  # Styles (if needed)
└── constants.js       # Component constants
```

## 🗑️ Files to Remove

- `src/components/AddAdmin.jsx` (duplicate)
- `src/components/LoginErr.jsx` (move to auth/)
- `src/components/LogInForm.jsx` (move to auth/LoginForm.jsx)
- `src/components/FormHeader.AddAdminModal.jsx` (move to admin/)
- `src/components/DateTimeInput.AddAdminModal.jsx` (move to admin/)
- `src/components/AdminInputs.AddAdminModal.jsx` (move to admin/)
- `src/components/ToggleButton.AdminsTable.jsx` (move to admin/)
- `src/components/DeleteAdmin.AdminsTable.jsx` (move to admin/)
- `src/components/SearchAdmin.jsx` (move to admin/)
- `src/pages/AdminPage.jsx` (move to Admin/)
- `src/pages/AdminsPage.jsx` (move to Admins/)

## 🎯 Benefits

1. **Better Organization** - Easy to find files
2. **Scalability** - Easy to add new features
3. **Maintainability** - Clear structure
4. **Collaboration** - Team knows where things are
5. **Performance** - Better code splitting
