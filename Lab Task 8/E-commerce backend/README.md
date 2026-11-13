# VÉRIDIAN Store
## English-language storefront with a NestJS API

The storefront uses **HTML, CSS, JavaScript, and Bootstrap 5**. Its API is built with **NestJS, TypeORM, and SQLite**. The store interface and messages are in English.

---

### Folder Structure
```
├── index.html        # Storefront and English-language checkout/review forms
├── style.css         # Storefront styling
├── app.js            # Cart and API-connected browser logic
├── server/           # NestJS API
│   └── src/
│       ├── products/ # Product entity, controller, service, and module
│       ├── reviews/  # Review entity, DTO, controller, and service
│       └── orders/   # Order/order-item entities, DTO, controller, and service
└── README.md
```

---

### Run the API
Install [Node.js 20 or later](https://nodejs.org/) and run these commands from the `server` folder:

```bash
npm install
npm run start:dev
```

The API starts at `http://localhost:3000/api`. It creates a local `store.sqlite` database and seeds sample products and reviews on first launch. Set `PORT`, `DB_PATH`, or `CORS_ORIGIN` to change the defaults. TypeORM schema synchronization is enabled for local development; configure migrations before using this project in production.

### API routes
- `GET /api/products` and `GET /api/products/:id`
- `GET /api/reviews` and `POST /api/reviews`
- `POST /api/orders`

Review and order request bodies are validated. Creating an order checks stock and calculates prices, discount, shipping, and total on the server in a database transaction. The accepted promo code is `ZINC15`.

### Run the storefront
Open `index.html` with the VS Code **Live Server** extension. The browser requests products and reviews from the NestJS API. If the API is offline, sample products remain visible; order and review submissions show an error instead of pretending they succeeded. Set `window.STORE_API_URL` before loading `app.js` to use a different API URL.

### Demo limitations
- Checkout records a pending order only. It does **not** process payments or collect card details.
- Account sign-in and signup remain browser-only demonstrations using `localStorage`; they are not connected to the API.
- The default SQLite synchronization setting is for development only.

---

All storefront copy, product categories, form labels, and API validation messages use English.
