# CometChat Integration with Next.js

## Overview
This project is a Next.js-based assignment that integrates CometChat's one-to-one chat functionality. It enables user signup, login, and real-time messaging between authenticated users.

## Features Implemented

### 1. User Signup
- A signup page allows new users to register using the **Create User API**:
  - `https://appid.api-us.cometchat.io/v3/users`
- Upon successful signup, the user is redirected to the `/login` page.

### 2. User Login
- The login page accepts the user's **UUID** and validates it using the **User Validation API**:
  - `https://appid.api-us.cometchat.io/v3/users/uid`
- After successful login, the user is redirected to `/other-user-id`.

### 3. Connecting to Another User
- The `/other-user-id` page allows users to input the UUID of another user to initiate a chat.
- After validation, users are redirected to the chat page to start messaging in a one-on-one conversation.

## Integration Issue Faced

### Persisting Previous User's Info
- When logging in with a different user, the previous user's information remains saved.
- As a result, CometChat sends messages using the previously logged-in user instead of the current one.

## Documentation & Navigation Feedback

1. **Project Structure Information**
   - The documentation should include details about the Next app structure to help developers understand where changes should be made.
   - For example, disabling SSR in `index.tsx` can be confusing, as `index.tsx` is typically not used in an App Router setup.

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- CometChat API credentials

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Nayak1703/comet-chat.git
   ```
2. Navigate to the project directory:
   ```sh
   cd comet-chat
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Future Improvements
- Fix the issue of persisting previous user data upon login.
- Improve UI/UX for better navigation and user experience.


