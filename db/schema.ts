import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

const properties = {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
};

export const user = pgTable("user", {
  ...properties,
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  displayUsername: text("display_username"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  bio: text("bio"),
  role: text("role").$type<"USER" | "ADMIN">().notNull().default("USER"),
});

export const session = pgTable("session", {
  ...properties,
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  ...properties,
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
});

export const verification = pgTable("verification", {
  ...properties,
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const post = pgTable("post", {
  ...properties,
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const tag = pgTable("tag", {
  ...properties,
  name: text("name").notNull(),
});

export const tagToPost = pgTable(
  "tag_to_post",
  {
    postId: text("post_id")
      .notNull()
      .references(() => post.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.postId, table.tagId] })]
);

export const savedPost = pgTable(
  "saved_post",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("post_id")
      .notNull()
      .references(() => post.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.postId] })]
);

// Relations
export const userRelations = relations(user, ({ many }) => ({
  post: many(post),
  savedPost: many(savedPost),
}));

export const postRelations = relations(post, ({ one, many }) => ({
  user: one(user, { fields: [post.authorId], references: [user.id] }),
  tagToPost: many(tagToPost),
  savedPost: many(savedPost),
}));

export const savedPostRel = relations(savedPost, ({ one }) => ({
  user: one(user, { fields: [savedPost.userId], references: [user.id] }),
  post: one(post, { fields: [savedPost.postId], references: [post.id] }),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  tagToPost: many(tagToPost),
}));

export const tagToPostRelations = relations(tagToPost, ({ one }) => ({
  post: one(post, { fields: [tagToPost.postId], references: [post.id] }),
  tag: one(tag, { fields: [tagToPost.tagId], references: [tag.id] }),
}));
