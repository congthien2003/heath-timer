# Contributing to Health Timer

Thank you for your interest in contributing to Health Timer! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

Before creating a bug report:

1. Check the [existing issues](https://github.com/yourusername/health-timer/issues)
2. Verify you're using the latest version
3. Test if the issue persists in a clean environment

When reporting, include:

- **Clear title**: Describe the issue concisely
- **Steps to reproduce**: Detailed steps to recreate the issue
- **Expected vs actual behavior**: What should happen vs what does happen
- **Environment**: OS version, app version, installation method
- **Screenshots/logs**: If applicable

### Suggesting Features

Feature requests are welcome! Please:

1. Check if the feature was already suggested
2. Describe the problem it solves
3. Provide use cases and examples
4. Explain why it would benefit other users

### Pull Requests

#### Before Starting

1. Check open issues/PRs to avoid duplicate work
2. For major changes, open an issue first to discuss
3. Fork the repository and create a feature branch

#### Development Setup

```bash
# Fork and clone your fork
git clone https://github.com/congthien2003/health-timer.git
cd health-timer

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Start development
npm run dev
```

#### Code Guidelines

**TypeScript**

- Use strict TypeScript (no `any` unless absolutely necessary)
- Prefer interfaces over types for object shapes
- Add JSDoc comments for public APIs

**React**

- Use functional components with hooks
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks

**Styling**

- Use Tailwind CSS utility classes
- Maintain existing gradient theme
- Ensure responsive design

**Code Style**

- Use meaningful variable/function names
- Add comments for complex logic
- Follow existing code patterns
- Keep functions small and focused

#### Testing

```bash
# Run tests (when implemented)
npm test

# Build and verify
npm run build
npm run build:dir

# Test the built app
```

#### Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]
[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

Examples:

```
feat(timer): add custom interval input
fix(notifications): resolve sound playback issue
docs(readme): update installation instructions
```

#### Pull Request Process

1. **Update your branch**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test thoroughly**:

   - Run the app and verify your changes
   - Check for console errors
   - Test edge cases

3. **Create PR**:

   - Write a clear title and description
   - Reference related issues (`Fixes #123`)
   - Add screenshots/GIFs for UI changes
   - Mark as draft if work-in-progress

4. **Code Review**:

   - Address review comments promptly
   - Keep discussions focused and professional
   - Update PR based on feedback

5. **Merge**:
   - Squash commits if requested
   - Ensure CI passes (when implemented)
   - Wait for maintainer approval

## 🏗️ Project Structure

```
health-timer/
├── src/
│   ├── main/              # Electron main process
│   │   ├── index.ts       # Entry point
│   │   └── services/      # Business logic
│   ├── renderer/          # React frontend
│   │   ├── App.tsx        # Root component
│   │   ├── components/    # UI components
│   │   └── stores/        # State management
│   ├── preload/           # Bridge between main/renderer
│   └── shared/            # Shared types/constants
├── resources/             # Icons and assets
└── docs/                  # Documentation
```

## 🎯 Priority Areas

Currently seeking contributions in:

1. **Testing**: Unit tests, integration tests, E2E tests
2. **Accessibility**: ARIA labels, keyboard navigation
3. **Documentation**: API docs, tutorials, examples
4. **Internationalization**: Multi-language support
5. **Platform Support**: macOS and Linux versions

## 📝 Documentation

When adding features:

- Update README.md if user-facing
- Add JSDoc comments for new APIs
- Update CHANGELOG.md
- Create examples if applicable

## 🔍 Code Review Checklist

Before submitting:

- [ ] Code follows project style guidelines
- [ ] No console.logs in production code
- [ ] TypeScript compiles without errors
- [ ] App runs without errors in dev mode
- [ ] Changes tested manually
- [ ] Documentation updated
- [ ] Commit messages follow convention

## 🐛 Debugging Tips

### Development

```bash
# Enable verbose logging
$env:DEBUG="*"; npm run dev

# Open DevTools automatically
# Add to main window options:
webPreferences: {
  devTools: true
}
```

### Common Issues

**Module not found**

- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`

**TypeScript errors**

- Restart TypeScript server in VS Code
- Check tsconfig.json settings

**Hot reload not working**

- Restart dev server
- Check file watcher limits on Linux

## 💡 Feature Ideas

Want to contribute but not sure where to start? Consider:

- [ ] Dark mode theme
- [ ] Custom task creation UI
- [ ] Statistics dashboard
- [ ] Export/import settings
- [ ] Keyboard shortcuts
- [ ] Multi-language support
- [ ] Task categories
- [ ] Focus/Pomodoro mode
- [ ] Sound customization
- [ ] Notification history

## 📜 License

By contributing, you agree that your contributions will be licensed under the ISC License.

## ❓ Questions?

- Open an issue with the `question` label
- Start a discussion on GitHub Discussions
- Check existing documentation first

## 🙏 Thank You!

Every contribution, no matter how small, is valuable and appreciated!

---

**Happy coding!** 🎉
