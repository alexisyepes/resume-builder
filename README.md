# AI Resume Builder

A **full-stack SaaS application** that allows users to create, edit, and download professional resumes — powered by **AI-generated summaries and skills sugestions**, **customizable templates**, and **multi-language support**.

Built with **Next.js**, **Node.js**, **Express**, **MySQL (Aiven)**, and **Sequelize**, this project demonstrates modern full-stack architecture, authentication, responsive UI, and internationalization (i18n) support for 8 languages.

---

## Live Demo

🔗 **Frontend (Vercel):** [https://resume-builder-virid-xi.vercel.app/](https://resume-builder-virid-xi.vercel.app/)

---

## Features

- **AI-powered summaries** – Uses OpenAI API to generate professional resume summaries.
- **Full-stack architecture** – Next.js frontend + Node.js/Express backend + MySQL database.
- **Authentication system** – Users can sign up, sign in, and save their resumes.
- **Resume builder dashboard** – Dynamic tab selector, input fields, and live preview.
- **Templates gallery** – Choose from multiple templates (3 available, more coming soon).
- **Multi-language support** – English, Spanish, Arabic, French, Italian, Portuguese, Hindi, Chinese.
- **PDF export** – Download resumes directly in PDF format.
- **Environment variables** for secure API keys and DB credentials.
- **Responsive design** – Fully responsive except dashboard builder (currently desktop optimized).
- **Subscription plans (UI ready)** – Free and paid plan interfaces for future integration.

---

## Tech Stack

**Frontend**

- Next.js 15
- React
- Zustand/Context (state management)
- Tailwind CSS
- i18n (translations)
- Axios

**Backend**

- Node.js
- Express
- Sequelize ORM
- MySQL (Aiven cloud)
- JWT authentication
- OpenAI API integration

**Deployment**

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Aiven (MySQL Cloud)

---

## ⚖️ License

This repository is shared publicly **for portfolio and educational purposes only**.  
All rights reserved © 2025 **Alex Y Sanabria**.  
Unauthorized use, reproduction, or distribution of this code is prohibited.

## Clone the project

Clone the project from: `git@github.com:alexisyepes/resume-builder.git`

## Environment Variables

Create a `.env.local` file in the frontend/nextjs folder and in backend (at root) `.env` file using the example files.

## Install dependencies

For Backend run: `npm install` <br>
For Frontend, `cd frontend/nextjs` and then run: `npm install`

# Start backend

From the root, run:
npm start

# Start frontend

cd frontend/nextjs
npm run dev

![IMAGE](/frontend/nextjs/public/images/readme/Screenshot1.png)
![IMAGE](/frontend/nextjs/public/images/readme/Screenshot2.png)
![IMAGE](/frontend/nextjs/public/images/readme/Screenshot3.png)
![IMAGE](/frontend/nextjs/public/images/readme/Screenshot4.png)
![IMAGE](/frontend/nextjs/public/images/readme/Screenshot5.png)
![IMAGE](/frontend/nextjs/public/images/readme/Screenshot6.png)
![IMAGE](/frontend/nextjs/public/images/readme/Screenshot7.png)
![IMAGE](/frontend/nextjs/public/images/readme/ai-demo.gif)
![IMAGE](/frontend/nextjs/public/images/readme/ai-demo-2.gif)
