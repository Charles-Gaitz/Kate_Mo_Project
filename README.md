# KateMo Project 🎮

A comprehensive React + TypeScript arcade game system featuring Kate Morales as the protagonist across multiple themed adventures.

## 🎯 Features

### Three Authentic Arcade Games
- **🟡 PacmanGame**: Maze navigation with ghost AI and dot collection mechanics
- **� LawnMowerGame**: Strategic lawn mowing puzzle where you must mow all grass without going over the same spot twice
- **🦕 DinosaurGame**: Endless runner with obstacle avoidance and ducking mechanics

### 🎨 Dynamic Theme System
8 complete themes with unique game assets:
- **Default**: Classic arcade style
- **Star Wars**: Kate Skywalker vs Imperial forces
- **Barbie**: Pink paradise adventure
- **Nature**: Earth-friendly eco theme
- **Winter**: Snowy wonderland
- **Spring**: Blooming gardens
- **Summer**: Sunny beach vibes
- **Autumn**: Fall harvest season

Each theme features:
- Custom character designs for Kate
- Themed enemies and obstacles
- Unique collectibles
- Environment-specific colors and backgrounds
- Personalized game names

### 🚀 Technical Stack
- **React 18.3.1** - Modern component architecture
- **TypeScript 5.5.3** - Type safety and better development experience
- **Vite 5.4.2** - Lightning-fast development and building
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Canvas API** - Smooth game rendering and animations
- **localStorage** - High score persistence per theme
- **Lazy Loading** - Dynamic imports for improved performance (~25KB initial bundle)
- **Accessibility** - WCAG compliant with screen reader support and keyboard navigation

## 🎮 How to Play

### Controls
- **Spacebar/W**: Jump (all games)
- **Arrow Keys**: Movement (Pacman/Mario)
- **S**: Duck (Dinosaur Game)

### Game Objectives
- **Pacman**: Collect all dots while avoiding ghosts
- **Lawn Mower**: Mow all grass in unique lawn shapes without backtracking over mowed areas
- **Dinosaur**: Survive as long as possible, avoid obstacles

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
git clone https://github.com/Charles-Gaitz/Kate_Mo_Project.git
cd Kate_Mo_Project
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## ♿ Accessibility Features
- **Semantic HTML** with proper landmarks (header, main, nav, footer)
- **ARIA labels** and roles for screen readers
- **Keyboard navigation** support for all interactive elements
- **Focus indicators** with visible outlines for keyboard users
- **Reduced motion** support respecting user preferences
- **Screen reader** announcements for theme changes
- **Color contrast** optimized for readability across all themes

## 📱 Responsive Design
Fully responsive design that works on desktop and mobile devices with touch controls.

## 🏆 High Scores
Each theme maintains separate high scores, stored locally in your browser.

## 🎨 Theme Switching
Switch between themes anytime to experience different game aesthetics and character designs.

---

**Created with ❤️ featuring Kate Morales**

*From bolt.new prototype to full React+TypeScript implementation*
