# AdSpace - Multilingual Advertising Space Marketplace

AdSpace is a modern web application built with React and TypeScript that facilitates the buying and selling of advertising spaces. The platform features comprehensive internationalization support, robust user authentication, and an intuitive dashboard interface.

## 🚀 Features

### 👤 User Authentication
- Secure login and registration
- Role-based access control
- Form validation with translated error messages
- Protected routes

### 📊 Dashboard
- Interactive metrics display
- Ad space management interface
- User-specific content
- Status tracking and updates

### 🎨 UI/UX
- Modern, responsive design
- Consistent UI components
- Toast notifications
- Loading states
- Error handling

### 🌐 Internationalization
- Multi-language support (currently English and French)
- Dynamic language switching
- Nested translation structure
- Type-safe translations
- Support for dynamic message interpolation
- Fallback mechanism for missing translations

## 🛠 Technical Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Form Handling**: React Hook Form
- **Type Safety**: TypeScript
- **Routing**: React Router

## 📁 Project Structure

```
project/
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React contexts including LanguageContext
│   ├── hooks/          # Custom React hooks
│   ├── locales/        # Translation files
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root with the following variables:
```
VITE_API_URL=your_api_url


### Language Configuration
The application's internationalization is configured through the `LanguageContext` and translation files:

- `src/contexts/LanguageContext.tsx`: Manages the current language state
- `src/locales/translations.ts`: Contains translation mappings for all supported languages


```

## 🌐 Translation System

### Structure
Translations are organized in a nested structure:
```typescript
{
  common: {
    buttons: { ... },
    labels: { ... }
  },
  errors: { ... },
  validation: { ... },
  dashboard: { ... }
}
```

### Usage
```typescript
// Using translations in components
const { t } = useLanguage();
const message = t('common.buttons.submit');
```

### Adding New Languages
1. Add new language key to `translations.ts`
2. Create translations following the existing structure
3. Update language selector in the UI

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Building for Production
```bash
npm run build
# or
yarn build
```

## 🧪 Testing

Run tests with:
```bash
npm run test
# or
yarn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 Translation Management

### Adding New Translations
1. Locate `src/locales/translations.ts`
2. Add new translation keys following the existing structure
3. Provide translations for all supported languages
4. Use type-safe keys in components

### Translation Guidelines
- Keep translations concise and clear
- Use placeholder syntax for dynamic content
- Maintain consistent terminology
- Test translations in context

## 🔒 Security

- Authentication tokens are stored securely
- API keys should be kept in environment variables
- Role-based access control is implemented
- Form data is validated both client and server-side

## 🐛 Known Issues

- Check the GitHub Issues page for current known issues
- Report new issues with detailed reproduction steps

## 📈 Future Enhancements

- Additional language support
- Translation management interface
- Enhanced metrics and analytics
- Advanced ad space filtering
- User preference persistence
- Automated translation testing
