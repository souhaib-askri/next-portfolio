# Ahmed Al-Rashid's Portfolio

A modern, interactive portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**. Features a desktop-inspired UI with a Catppuccin Mocha color scheme and smooth animations.

## 🎯 Features

- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **4 Interactive Workspaces** - Home, Skills, Projects, Contact
- **Desktop-Inspired UI** - Window chrome with title bars and system controls
- **Dark Theme** - Catppuccin Mocha color palette with beautifully coordinated colors
- **Keyboard Navigation** - Use arrow keys (← →) to switch workspaces
- **Touch Support** - Swipe gestures for mobile navigation
- **Animated Transitions** - Smooth workspace transitions and component animations
- **Real-time Clock** - Live system clock with date display
- **Contact Form** - Functional message form with success feedback

## 📁 Project Structure

```
app/portfolio/
├── Portfolio.tsx              # Main component orchestrator
├── index.tsx                  # Export entry point
├── constants.ts               # Colors, types, interfaces
├── hooks.ts                   # useClock() hook
├── styles.tsx                 # Global styles & animations
│
└── components/
    ├── Workspace1.tsx         # Home/About workspace
    ├── Workspace2.tsx         # Skills/Experience workspace
    ├── Workspace3.tsx         # Projects workspace
    ├── Workspace4.tsx         # Contact workspace
    ├── Win.tsx                # Window component
    ├── SectionHeader.tsx       # Section header with icon
    ├── Topbar.tsx             # Top navigation bar
    ├── Viewport.tsx           # Content viewport/carousel
    └── Notification.tsx       # Welcome notification
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd souhaieb-portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Production Build

```bash
npm run build
npm start
```

## 🎨 Design System

### Color Palette (Catppuccin Mocha)
- **Accent**: Mauve (`#cba6f7`)
- **Primary**: Blue (`#89b4fa`)
- **Success**: Green (`#a6e3a1`)
- **Warning**: Yellow (`#f9e2af`)
- **Danger**: Red (`#f38ba8`)

### Typography
- **Primary Font**: IBM Plex Sans Arabic
- **Monospace Font**: JetBrains Mono

## 📱 Navigation

### Keyboard Shortcuts
- **→ (Right Arrow)** - Go to previous workspace
- **← (Left Arrow)** - Go to next workspace
- **Mouse** - Click workspace names in topbar

### Touch Gestures
- **Swipe Right** - Go to previous workspace
- **Swipe Left** - Go to next workspace

## 🔧 Technologies

- **Framework**: [Next.js 16](https://nextjs.org)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **UI Library**: [React 19](https://react.dev)
- **Icons**: [Lucide React](https://lucide.dev)
- **Styling**: Inline CSS with CSS animations
- **Build Tool**: Turbopack

## 📊 Workspaces

### 1️⃣ Home (`.../0`)
- Personal introduction
- Skills tags
- System statistics
- Terminal simulation
- About section

### 2️⃣ Skills (`.../1`)
- Technology stack visualization
- Proficiency bars
- Career timeline
- Experience details

### 3️⃣ Projects (`.../2`)
- Featured projects showcase
- GitHub statistics
- Open-source contributions
- Project details with tech stacks

### 4️⃣ Contact (`.../3`)
- Contact form
- Social links
- Email, GitHub, LinkedIn, Blog
- Philosophy quote

## 🎬 Animations

- **Win Animation**: Smooth entrance with scale + translate
- **Notification Animation**: Slide-up entrance
- **Skill Bars**: Growing animation with gradient
- **Hover Effects**: Interactive feedback on cards and buttons
- **Transitions**: 480ms workspace carousel transitions

## 🔍 Component Breakdown

| Component | Purpose |
|-----------|---------|
| `Portfolio.tsx` | Root component managing state and layout |
| `Workspace1.tsx` | Home section with intro and stats |
| `Workspace2.tsx` | Skills and experience showcase |
| `Workspace3.tsx` | Projects and contributions |
| `Workspace4.tsx` | Contact form and links |
| `Win.tsx` | Reusable window chrome wrapper |
| `SectionHeader.tsx` | Section title with icon |
| `Topbar.tsx` | Navigation and system info |
| `Viewport.tsx` | Carousel container |
| `Notification.tsx` | Welcome message |

## 📝 Environment Setup

No environment variables required. The portfolio works out of the box.

## 🛠️ Development Tips

### Adding a New Workspace
1. Create `components/Workspace5.tsx`
2. Add to `WORKSPACES` array in `Portfolio.tsx`
3. Update workspace count logic (currently `0-3`)

### Customizing Colors
Edit `constants.ts` in the `COLORS` object:
```typescript
export const COLORS = {
  base: '#1e1e2e',
  // ... other colors
};
```

### Modifying Content
- **Skills**: Edit `SKILLS` array in `Workspace1.tsx`
- **Experience**: Edit `EXPERIENCE` array in `Workspace2.tsx`
- **Projects**: Edit `PROJECTS` array in `Workspace3.tsx`
- **Contact**: Edit `CONTACT_LINKS` array in `Workspace4.tsx`

## 📦 Dependencies

```json
{
  "next": "16.2.4",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "lucide-react": "^latest",
  "typescript": "^5"
}
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Catppuccin Theme](https://github.com/catppuccin/catppuccin)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to open issues and submit pull requests for any improvements.

## 👨‍💻 About

Portfolio of Ahmed Al-Rashid, a full-stack developer passionate about building elegant digital experiences with a focus on open-source software and Linux ecosystems.

---

**Last Updated**: April 2026
