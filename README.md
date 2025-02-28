<!-- # Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->


# KIITBites - Mobile Application

## Introduction
The **KIITBites Mobile Application** is the frontend solution for the KIITBites platform, designed specifically for mobile users. It enables students to seamlessly order food, track their orders in real time, and receive notifications about their purchases. Built using **React Native**, the mobile app ensures a smooth and efficient user experience on both Android and iOS devices.

## Tech Stack
- **Framework:** React Native
- **State Management:** Redux Toolkit
- **UI Components:** React Native Paper
- **Navigation:** React Navigation
- **Network Requests:** Axios
- **Real-Time Updates:** Socket.io
- **Authentication:** Firebase Auth, JWT
- **Push Notifications:** Expo Notifications

## Features
- **User Authentication** (Google OAuth, Email/Password login)
- **Food Ordering System** with real-time tracking
- **Cart Management** (Add, remove, modify items before checkout)
- **Payment Integration** (UPI, Card, Wallets)
- **Push Notifications** (Order status, special offers)
- **Order Tracking** (Live updates from preparation to pickup)
- **User Profile & Preferences** (Saved addresses, order history)

## Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_BACKEND_URL=your_backend_url
BACKEND_URL=your_backend_url
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
```

## Installation & Setup
### Prerequisites
- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)

### Installation Steps
1. **Fork the repository** on GitHub.
2. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/KIITBites-Mobile.git
   cd KIITBites-Mobile
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a new branch** following the naming convention:
   - For new features: `features/feature-name`
   - For bug fixes: `fixes/fix-name/feature-name`
   ```bash
   git checkout -b features/your-feature-name
   ```

### Running the Mobile Application
```bash
npx expo start
```
Scan the QR code in Expo Go (Android/iOS) to run the app.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b features/feature-name` or `fixes/fix-name/feature-name`).
3. Commit your changes (`git commit -m 'Added new feature'`).
4. Push to your branch (`git push origin features/feature-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For queries or contributions, contact the **KIITBites Team** at [kiitbites@gmail.com](mailto:kiitbites@gmail.com).

## Design Reference
Figma Link: [Click Here](https://www.figma.com/design/uCTZfzhDkk06FNwA2Ooc4G/KIITBites?node-id=0-1&t=eN4BzoUfe3aSVfNt-0)
