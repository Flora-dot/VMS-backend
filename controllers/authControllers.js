import bcrypt from "bcrypt"; // make sure bcrypt is imported

import { ROLES } from "../config/roles_list.js"; // adjust path

// Temporary mock "database"
let users = [];


// Controller function to handle user registration
export const register = async (req, res) => {
  try {
    const { employeeId, email, password, role } = req.body;

    // Check if user already exists by employeeId
    const existingUser = users.find(
      (user) => user.employeeId === employeeId
    );
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default to User if role is missing or invalid
    const assignedRole = ROLES[role] || ROLES.User;

    // Create new user object
    const newUser = {
      employeeId,
      email,
      password: hashedPassword,
      role: assignedRole,
    };

    // Save to "database" (mock)
    users.push(newUser);

    console.log("User saved:", newUser);

    res.status(201).json({
      message: "User registered successfully (test mode)",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Controller function to handle user login
export const login = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    // Find user by employeeId
    const existingUser = users.find(
      (user) => user.employeeId === employeeId
    );

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Remove password from user data before sending response
    const { password: _, ...userData } = existingUser;

    res.status(200).json({
      message: "User logged in successfully (test mode)",
      user: userData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
