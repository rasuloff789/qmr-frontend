# User Guide - QMR Frontend

## 📖 Table of Contents

1. [Authentication](#authentication)
2. [Dashboard](#dashboard)
3. [Admin Management](#admin-management)
4. [Dark Mode](#dark-mode)
5. [Language Selection](#language-selection)
6. [Troubleshooting](#troubleshooting)

## 🔐 Authentication

### Login

1. Navigate to the login page
2. Enter your credentials:
   - **Username**: Your admin username
   - **Password**: Your password
3. Click the "Login" button

### Logout

- Click your profile/settings icon in the top navigation
- Select "Logout"

## 📊 Dashboard

The dashboard provides an overview of the system. From here, you can navigate to different sections of the application.

## 👥 Admin Management

### View All Admins

1. Click "Admins" in the sidebar
2. View the list of all administrators
3. Use the search bar to filter admins by name or username
4. Click on any admin row to view detailed information

### Add a New Admin

1. Click the "Add Admin" button
2. Fill in the required information:
   - **Full Name**: Admin's full name
   - **Username**: Unique username
   - **Password**: Secure password
   - **Phone Number**: Select country code and enter number
   - **Telegram Username**: Telegram handle (without @)
   - **Birth Date**: Admin's date of birth
3. Click "Add Admin" to create
4. The admin will appear in the list immediately

### Edit Admin Information

1. Navigate to the admin detail page
2. Click the "Edit" button
3. Modify the fields you want to change
4. Click "Save Changes" to update
5. Click "Cancel" to discard changes

### Delete an Admin

1. In the admins table, find the admin you want to delete
2. Click the delete (trash) icon
3. Confirm the deletion in the popup

### Toggle Admin Status

1. In the admins table, use the toggle switch
2. Green = Active
3. Gray = Inactive

## 🌙 Dark Mode

### Enable/Disable Dark Mode

1. Locate the dark mode toggle in the top navigation
2. Click the toggle to switch between light and dark modes
3. Your preference is saved automatically

**Note**: Dark mode affects the entire application interface.

## 🌍 Language Selection

### Change Language

1. Locate the language selector in the top navigation
2. Select your preferred language:
   - 🇺🇿 **O'zbekcha** (Uzbek)
   - 🇬🇧 **English**
3. The interface will update immediately

## 🔍 Features

### Search

- Use the search bar to quickly find admins
- Search by name, username, or phone number
- Results update in real-time as you type

### Pagination

- Admins are paginated for better performance
- Use the pagination controls to navigate between pages

### Sorting

- Click column headers to sort by that field
- Click again to reverse the sort order

## ⚠️ Troubleshooting

### Login Issues

**Problem**: Cannot login
- **Solution**: Verify your credentials are correct
- Check that the backend server is running
- Clear browser cache and cookies

**Problem**: "Network error" message
- **Solution**: Ensure the backend server is running on `localhost:4000`
- Check your internet connection

### Admin Management Issues

**Problem**: Cannot add admin
- **Solution**: 
  - Check that all required fields are filled
  - Verify username is unique
  - Check phone number format
  - Ensure password meets requirements

**Problem**: Cannot edit admin
- **Solution**:
  - Make sure you're in edit mode
  - Verify the form validation passes
  - Check your connection to the backend

**Problem**: Changes not saving
- **Solution**:
  - Ensure you clicked "Save Changes"
  - Check for validation errors
  - Verify your authentication token is valid

### Dark Mode Issues

**Problem**: Dark mode not working
- **Solution**:
  - Clear browser cache
  - Check browser compatibility (modern browsers only)
  - Try refreshing the page

### Language Issues

**Problem**: Text not translating
- **Solution**:
  - Refresh the page
  - Clear browser cache
  - Ensure the language file is loaded

## 💡 Tips

1. **Keyboard Shortcuts**:
   - Use Tab to navigate between form fields
   - Press Enter to submit forms

2. **Form Validation**:
   - Fields with errors are highlighted in red
   - Hover over error messages for more details

3. **Performance**:
   - Use search to find specific admins quickly
   - Dark mode reduces eye strain in low light

4. **Accessibility**:
   - All interactive elements are keyboard accessible
   - Screen readers are supported

## 📞 Support

For additional support or to report bugs, please contact the development team.

## 🔒 Security Notes

- Never share your login credentials
- Log out when using shared computers
- Report suspicious activity immediately
- Keep your password secure and change it regularly
