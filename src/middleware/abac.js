export const ROLES = {
  admin: {
    tasks: {
      create: true,
      read: true,
      update: true,
    },
    records: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  moderator: {
    tasks: {
      create: true,
      read: true,
      update: true,
      delete: (user, task) => task.authorId === user.id,
    },
    records: {
      create: true,
      read: true,
      update: true,
      delete: (user, record) => record.authorId === user.id,
    },
  },
  user: {
    tasks: {
      create: true,
      read: (user, task) =>
        task.authorId === user.id || task.invitedUsers.includes(user.id),
      update: (user, task) => task.authorId === user.id,
    },
    records: {
      create: true,
      read: (user, record) => !user.blockedBy.includes(record.authorId),
      update: (user, record) =>
        record.authorId === user.id || record.invitedUsers.includes(user.id),
      delete: (user, record) =>
        (record.authorId === user.id ||
          record.invitedUsers.includes(user.id)) &&
        record.completed,
    },
  },
};

// Utility function to check permissions
function hasPermission(user, resource, action, data) {
  return user.roles.some((role) => {
    const permissions = ROLES[role]?.[resource]?.[action];
    if (permissions == null) {
      return false;
    }

    // If permission is a boolean, return it directly
    if (typeof permissions === "boolean") {
      return permissions;
    }
    // If permission is a function, validate data and evaluate it
    return data != null && permissions(user, data);
  });
}

export const enforceABAC = (resource, action) => {
  return (req, res, next) => {
    const user = req.user; // Assuming user information is attached to req object
    console.log("res:", res.data);
    if (!user || !hasPermission(user, resource, action)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
