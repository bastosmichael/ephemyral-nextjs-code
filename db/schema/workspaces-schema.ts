import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { projectsTable } from "./projects-schema"

export const workspacesTable = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  githubOrganizationId: text("github_organization_id"),
  githubOrganizationName: text("github_organization_name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const workspacesRelations = relations(workspacesTable, ({ many }) => ({
  projects: many(projectsTable)
}))

export type InsertWorkspace = typeof workspacesTable.$inferInsert
export type SelectWorkspace = typeof workspacesTable.$inferSelect
