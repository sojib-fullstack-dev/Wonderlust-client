# 🌍 Wanderlust - Full-Stack Trip Booking Web Application

**Plan less, travel more.** Discover curated tour packages and enjoy seamless trip booking anytime, anywhere. **Wanderlust** is your gateway to extraordinary travel experiences around the world, built with modern full-stack web technologies.

🔗 **Live Website:** [https://wanderlust-go.vercel.app/](https://wanderlust-go.vercel.app/)  
💻 **Client Repository:** [Wonderlust-client](https://github.com/sojib-fullstack-dev/Wonderlust-client)  
⚙️ **Server Repository:** [Wonderlust-server](https://github.com/sojib-fullstack-dev/Wonderlust-server)  

---

## ✨ Key Features

- **Smart Destination Search:** Filter trips easily by location, date/duration, budget range, and number of travelers.
- **Explore Curated Destinations:** Browse breathtaking travel packages with detailed descriptions and pricing.
- **Add Destination:** Authorized users can add new destinations and travel packages directly to the platform.
- **My Bookings & Profile Management:** Track, manage, and review your booked trips from a dedicated user dashboard.
- **Secure Authentication:** Complete Sign Up, Login, and user session management system.
- **Traveler Reviews & Newsletter:** Read verified traveler testimonials and subscribe for exclusive travel deals.
- **Fully Responsive UI:** Clean, modern interface optimized for mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

### Frontend (`Wonderlust-client`)
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS, shadcn/ui (`components.json`)
- **Deployment:** Vercel

### Backend (`Wonderlust-server`)
- **Runtime & Framework:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Vercel (`vercel.json`)

---

## 🚀 Getting Started (Local Setup)

To run this project locally, you will need to set up both the client and server repositories.

### 1. Setup the Server (`Wonderlust-server`)
```bash
git clone https://github.com
cd Wonderlust-server
npm install
```
Create a `.env` file in the server root directory and add your database credentials:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
Start the backend server:
```bash
node index.js
```

<<<<<<< HEAD
### 2. Setup the Client (`Wonderlust-client`)
```bash
git clone https://github.com
cd Wonderlust-client
npm install
```
Create a `.env.local` file in the client root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Run the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the live app.
=======
Open [https://wonderlust-client-mocha.vercel.app](https://wonderlust-client-mocha.vercel.app) with your browser to see the result.
>>>>>>> 7706134 (error fix)

---

## 👨‍💻 Author

**Samiul Hasan (Sojib)**  
Full-Stack Web Developer  
- GitHub: [@sojib-fullstack-dev](https://github.com/sojib-fullstack-dev)

---

## 📄 License

© 2026 Wanderlust. All rights reserved.
