# 🕹️ VoxelQuest: Shishir's Portfolio

Welcome to **VoxelQuest**, a fully immersive, 3D voxel-based portfolio world inspired by the aesthetic of Minecraft. Navigate through a blocky digital landscape, interact with voxel models, and chat with an AI guide about my technical journey.

![Voxel Portfolio Preview](https://voxel-portfolio-eight.vercel.app/)

## 🌟 Key Features

- **🌲 Immersive Voxel World**: A high-performance 3D environment built with `React Three Fiber` and `Three.js`.
- **🤖 AI Guide Bot**: Powered by **Google Gemini 3 Flash**, an integrated assistant that can answer questions about my skills and projects in real-time.
- **⚔️ Minecraft UI/UX**:
  - Custom pixelated UI components (HUD, buttons, panels).
  - Interactive **Diamond Sword Cursor**.
  - Iconic "Press Start 2P" typography.
  - Authentic dirt-path loading screen with randomized splash text.
- **📹 Video Quests**: Project cards that feature real video previews of applications upon hover.
- **📜 Skill Tree & Certifications**: Minecraft-themed progress bars and "Knowledge Book" certification cards.
- **🎶 Atmospheric Audio**: Features C418's _Aria Math_ for that nostalgic, creative vibe (Music toggle included).

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **3D Engine**: Three.js, React Three Fiber, React Three Drei
- **AI Integration**: Google Generative AI (Gemini SDK)
- **Styling**: Tailwind CSS v4 (PostCSS)
- **Build Tool**: Vite
- **Animations**: Framer Motion (for UI) & Three.js Lerping (for 3D)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A **Google Gemini API Key** (Get one at [aistudio.google.com](https://aistudio.google.com/))

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shishir-sh26/voxel-portfolio.git
   cd voxel-portfolio
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your Gemini API key:

   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. **Launch the World**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `App.tsx`: Main entry point, handles loading states, audio, and global UI.
- `components/VoxelWorld.tsx`: The core 3D scene, scroll controls, and layout.
- `components/VoxelModel.tsx`: Reusable component for rendering block-based 3D models.
- `components/ChatInterface.tsx`: The UI for the Gemini-powered Guide Bot.
- `constants.tsx`: Contains project data, skill levels, and voxel model definitions.
- `services/geminiService.ts`: Logic for interacting with the Google GenAI API.

## 🎨 Customizing the World

To add your own projects or change the character model, look into `constants.tsx`. You can use the `createVoxelCube` helper to build complex structures out of individual `VoxelData` points.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

_“The sun is rising, and the voxels are calling. Happy coding!”_ 🔨
