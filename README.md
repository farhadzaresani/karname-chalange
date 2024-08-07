This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First of all clone the project on your own system

```bash
# with ssh
git clone git@github.com:farhadzaresani/karname-chalange.git
# or https
git clone https://github.com/farhadzaresani/karname-chalange.git

```

After that, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project is displays a table of user data, allowing for search, pagination, and sorting functionalities. It includes a modal for displaying detailed information about each user.

Features:
Search: Users can search for specific users by name or email.
Debounce: Search input is debounced to improve performance and avoid unnecessary API calls.
Pagination: User data is paginated, with controls for navigating between pages.
Sorting: Users can sort the data by name, username, email, and website.

Dependencies:
React
React Query
Axios
headlessui
Tailwind
Heroicons
