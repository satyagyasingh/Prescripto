# Prescripto

A doctor appointment booking platform. Patients browse doctors by speciality, pick a
free 30 minute slot and book it. Admins add doctors and watch every booking. Doctors get
their own panel to complete or cancel the appointments assigned to them.

figma file link: https://www.figma.com/design/9Vyqqr2jjFjIH1VKy7FMiG/Prescripto---UI-Design?node-id=1-753&node-type=frame&t=7u9gohEU5fXvxXVs-0

## Structure

| folder | what it is | port |
| --- | --- | --- |
| `frontend` | patient site, react + vite + tailwind | 5173 |
| `Admin` | admin and doctor panel, react + vite + tailwind | 5174 |
| `Backend` | express + mongoose api used by both | 4000 |

## Running it

Copy `Backend/.env.example` to `Backend/.env` and fill it in. Cloudinary keys are only
needed for image uploads (adding a doctor, changing a profile picture).

```
cd Backend  && npm install && npm run server
cd frontend && npm install && npm run dev
cd Admin    && npm install && npm run dev
```

The admin panel logs in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` pair from `.env`.
Doctors log in on the same screen with the email and password set when they were added.

## API

Three routers, three token headers: `token` for patients, `aToken` for admin,
`dToken` for doctors.

**`/api/user`** — `register`, `login`, `get-profile`, `update-profile`,
`book-appointment`, `appointments`, `cancel-appointment`

**`/api/admin`** — `login`, `add-doctor`, `all-doctors`, `change-availability`,
`appointments`, `cancel-appointment`, `dashboard`

**`/api/doctor`** — `list` (public), `login`, `appointments`, `complete-appointment`,
`cancel-appointment`, `dashboard`, `profile`, `update-profile`

Booked slots live on the doctor document as `slots_booked`, keyed by `day_month_year`,
so a slot taken by one patient disappears for everyone else.

## Not done yet

Online payment. Appointments carry a `payment` flag and the "Pay Online" button is in
place, but no gateway is wired up.
