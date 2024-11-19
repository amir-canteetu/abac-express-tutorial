# Attribute-Based Access Control (ABAC) with Express.js

This repository demonstrates how to implement Attribute-Based Access Control (ABAC) in a modern web application using **Express.js** on the backends. ABAC provides a powerful and flexible mechanism for managing permissions by evaluating attributes of users, resources, and the environment.

## Features

- **Granular Access Control**: Dynamically evaluate permissions based on attributes rather than static roles.
- **Contextual Policies**: Incorporate environmental attributes (e.g., time, location) for advanced security scenarios.
- **Scalable Design**: Easily extendable for more attributes and policies.

---

## Installation

### Clone the Repository
```bash
git clone https://github.com/amir-canteetu/abac-express-tutorial.git
cd abac-express-tutorial
```

### Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with the following variables:
   ```plaintext
   PORT=5000
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

---

## Usage

1. **Run the backend server**:
   - Start the Express server on [http://localhost:5000](http://localhost:5000).
2. **Test the ABAC policies**:
   - Log in as different users with varying attributes.
   - Try accessing resources to see how policies are enforced dynamically.

---

## Policies Example

A sample ABAC policy:
```json
  user: {
    tasks: {
      create: true,
      read: (user, task) =>
        task.authorId === user.id || task.invitedUsers.includes(user.id),
      update: (user, task) => task.authorId === user.id,
      delete: (user, task) => task.authorId === user.id,
    },
  }
```
This policy allows only users with the role `user`  to create a task, read only tasks they have authored or invited to. They also can update or delete only tasks they have authored.

---

## Extending the Implementation

- Add new attributes for more granular control, such as:
  - Geolocation
  - Device type
  - Time of day
- Integrate with external identity providers (e.g., Auth0, Okta) for attribute management.
- Enhance the policy evaluation logic to support more complex conditions.

---

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have ideas to enhance the implementation.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Resources

- Blog Article: [Implementing Attribute-Based Access Control (ABAC) In Modern Applications](https://amircandido.tech/post/attribute-based-access-control/)
