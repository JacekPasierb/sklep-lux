# 🏍️ Sklep-Lux – A modern eCommerce App built with Next.js

[Live demo on Netlify](https://sklep-lux.netlify.app/)

**Sklep-Lux** to nowoczesna aplikacja eCommerce stworzona w **Next.js**, wspierająca logowanie JWT, integrację z MongoDB i systemem płatności PayU. Obsługuje koszyk, logowanie, historię zamówień, dynamiczne API i optymalizację SEO.

---

## 🚀 Tech Stack

* **Next.js 15** (App Router, Server Actions, Turbopack)
* **TypeScript**
* **MongoDB** (Mongoose)
* **JWT** (httpOnly cookies)
* **PayU Sandbox**
* **Redux Toolkit + Persist**
* **Framer Motion**
* **Docker & Docker Compose**

---

## 🧪 Funkcjonalności

* ✅ Rejestracja i logowanie JWT
* ✅ Koszyk dla gościa i zalogowanego użytkownika
* ✅ Historia zamówień (dla zalogowanych)
* ✅ Płatności testowe (PayU)
* ✅ Backend API w Next.js (API Routes)
* ✅ MongoDB z danymi użytkowników i zamówień
* ✅ Obsługa `.env.local`
* ✅ Obsługa przez Docker Compose

---

## 📆 Uruchomienie projektu

### Lokalnie (bez Dockera)

```bash
git clone https://github.com/twoj-user/sklep-lux.git
cd sklep-lux
npm install
cp .env.example .env.local
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

---

### Przez Docker Compose

```bash
git clone https://github.com/twoj-user/sklep-lux.git
cd sklep-lux
cp .env.example .env.local
docker compose up --build
```

Otwórz: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Zmienne środowiskowe

Stwórz plik `.env.local` na podstawie `.env.example`:

```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
PAYU_CLIENT_ID=...
PAYU_CLIENT_SECRET=...
PAYU_POS_ID=...
PAYU_SECOND_KEY=...
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Uwaga: **nie umieszczaj pliku `.env.local` w repozytorium!**

---

## 🛫 Deployment

Aplikacja jest dostępna online:
**[https://sklep-lux.netlify.app](https://sklep-lux.netlify.app)**

---

## 🧠 Autor

Projekt stworzony przez **Jacek Pasierb** – Fullstack Developer

* Portfolio: [twoja-strona.pl](https://twoja-strona.pl)
* LinkedIn: [linkedin.com/in/twoj-link](https://linkedin.com/in/twoj-link)

---

## ✨ Status projektu

Projekt aktywny i rozwijany. W planach m.in.:

* Podpięcie CMS do zarządzania treściami
* Rozszerzenie o panelem admina
* Eksport zamówień do CSV / PDF
* Pełna optymalizacja Core Web Vitals
