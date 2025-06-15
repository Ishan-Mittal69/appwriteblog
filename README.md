# ✨ ProsePond
ProsePond is a dynamic AI powered web application crafted for users to articulate their thoughts and ideas through published articles. It seamlessly incorporates secure user authentication and verification, a robust rich text editor, and Appwrite as the backend, ensuring a smooth and secure experience for writers and readers.

## 🚀 Deployment
ProsePond is accessible on Link [Visit website](
https://appwriteblog-chi.vercel.app/ "ProsePond"), providing a convenient platform for users to experience the application.

## 🚀 Features
- User Authentication: Guarantees secure signup and login using email credentials with user verification through magic link sent on email.Also added Google Oauth 2.0 for lightning fast login .⚡⚡
- Article Management: Streamlines articles' creation, editing, and deletion.
- Rich Text Editor: Empowered by TinyMCE, the editor presents a range of formatting options, including font styles, colors, headings, indentations, images, tables, special characters, and numbering.
- Browse Articles: Users can peruse a dedicated section to read and engage with articles from other contributors.
- Theme Switching: user can Switch themes between light and dark mode
- AI-Powered Content Generation: Generate blog content using AI based on title and optional prompts

## 🛠️ Technologies Used
- React (Frontend): A versatile JavaScript library for crafting user interfaces.
- Tailwind CSS (Styling): A utility-first CSS framework for constructing efficient and responsive designs.
- Appwrite (Backend): An end-to-end backend server that simplifies backend tasks, ensuring secure user authentication and data storage.
- Redux Toolkit: For state management
- React Hook Form: For form handling and validation
- TinyMCE: For rich text editing
- Google Gemini AI: For AI-powered content generation

## 📦 Dependencies
- "@google/generative-ai": "^0.14.1"
- "@reduxjs/toolkit": "^2.2.5",
- "@tinymce/tinymce-react": "^5.0.1",
- "appwrite": "^14.0.1",
- "html-react-parser": "^5.1.10",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-hook-form": "^7.51.4",
- "react-redux": "^9.1.2",
- "react-router-dom": "^6.23.1",
- "@langchain/google-genai": "^0.0.14",
- "dompurify": "^3.0.9"
- "validator": "^13.12.0"
  
## 🚦 Running the Project
1. Clone the Repository: https://github.com/Ishan-Mittal69/appwriteblog
2. Install Dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Appwrite and Google Gemini API keys
4. Run `npm run dev` to start the development server

## 🌟 Usage
1. Sign Up and Log In: Establish an account using your email and log in to access the complete set of features.
2. Create and Manage Articles: Visit "Add Post" in the navbar to publish a post. Modify or delete your articles as needed.
3. Explore All Posts: Explore the "All Posts" section to discover articles published by other users.
4. AI Content Generation: When creating a post, you can use the AI generation feature by providing a title and optional prompt.

## 📝 Rich Text Editor
The application employs TinyMCE, offering an intuitive and powerful rich text editing experience. Users can format text, insert multimedia elements, and create engaging articles reminiscent of professional word processors.

## 🌐 Appwrite Integration
Appwrite serves as the backbone, streamlining backend operations and enhancing the security of user authentication and data storage. Appwrite simplifies the complexities and repetitions involved in building a modern backend API, enabling developers to construct secure apps more efficiently.

## 🤖 AI Integration
The application uses Google's Gemini AI model to generate blog content. Users can provide a title and optional prompt to generate AI-powered content, which can then be edited and customized using the rich text editor.