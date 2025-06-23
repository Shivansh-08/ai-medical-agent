import {
  pgTable,
  serial,
  text,
  varchar,
  json,
  integer,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  credits: integer(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const sessionChatTable = pgTable("sessionChatTable", {
  id: serial("id").primaryKey(),
  sessionId: varchar("sessionId", { length: 36 }).notNull(), // UUID format
  notes: text("notes").notNull(),
  conversation: json("conversation"), // optional JSON
  report: json("report"), // optional JSON
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdOn: varchar("createdOn", { length: 255 }).notNull(), // e.g., new Date().toString()
  selectedDoctor: json("selectedDoctor").notNull(),
});
