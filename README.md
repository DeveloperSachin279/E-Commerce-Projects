# Akash Interio - Premium Furniture E-Commerce Website

<div align="center">
  <h3>🏠 Design Your Dream Home</h3>
  <p>Premium furniture collection with modern aesthetics</p>
</div>

## 🌟 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Product Catalog**: Browse furniture by categories (Sofas, Beds, Chairs, Tables, Wardrobes, Decor)
- **Shopping Cart**: Add items, manage quantities, and checkout
- **Wishlist**: Save your favorite products
- **AI Design Assistant**: Get personalized design advice powered by Google Gemini AI
- **Product Details**: Detailed product information with images, materials, and dimensions
- **Search & Filter**: Find products quickly with search and category filters

## 🚀 Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Google Gemini AI** - AI Assistant

## 📦 Installation

**Prerequisites:** Node.js (v18 or higher)

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeveloperSachin279/E-Commerce-Projects.git
   cd akash-interio
   ```

2. **Install dependencies**
   ```bash
  npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     VITE_API_KEY=your_gemini_api_key_here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## 🌐 Deployment

This project is configured for easy deployment on **Vercel**.

### Deploy to Vercel:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable: `VITE_API_KEY` with your Gemini API key
5. Click Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
akash-interio/
├── components/
│   └── AIAssistant.tsx      # AI design assistant component
├── services/
│   └── geminiService.ts     # Gemini AI integration
├── App.tsx                  # Main application component
├── constants.ts             # Product data and categories
├── types.ts                # TypeScript type definitions
├── index.tsx               # Application entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
└── vercel.json             # Vercel deployment config
```

## 🎨 Features in Detail

### Home Page
- Hero section with call-to-action
- Category showcase (Bento grid layout)
- Featured products
- Trust badges (Free Delivery, Secure Payment, Premium Quality)

### Shop Page
- Product grid with filters
- Category filtering
- Sort by price/popularity
- Product cards with hover effects

### Product Details
- Large product images
- Detailed specifications
- Materials and dimensions
- Add to cart functionality

### AI Assistant
- Chat interface for design advice
- Product recommendations
- Interior design tips
- Powered by Google Gemini AI

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Google Gemini API key for AI assistant | Optional (AI features won't work without it) |

## 📝 License

This project is part of the E-Commerce Projects collection.

## 👤 Contact

**Akash Interio**
- 📍 Address: 2 Aakash furniture, Kolar road, Bhopal (M.P)
- 📞 Phone: 9111092001, 9977518856
- 📧 Email: lodhiakash286@gmail.com

---

Made with ❤️ for Akash Interio
