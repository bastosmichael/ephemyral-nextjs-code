-- Foreign Keys
ALTER TABLE "embedded_branches" ADD CONSTRAINT "embedded_branches_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "embedded_files" ADD CONSTRAINT "embedded_files_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "embedded_files" ADD CONSTRAINT "embedded_files_embedded_branch_id_embedded_branches_id_fk" FOREIGN KEY ("embedded_branch_id") REFERENCES "embedded_branches"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "instructions" ADD CONSTRAINT "instructions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "issue_messages" ADD CONSTRAINT "issue_messages_issue_id_issues_id_fk" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "issues" ADD CONSTRAINT "issues_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "issues_to_instructions" ADD CONSTRAINT "issues_to_instructions_issue_id_issues_id_fk" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "issues_to_instructions" ADD CONSTRAINT "issues_to_instructions_instruction_id_instructions_id_fk" FOREIGN KEY ("instruction_id") REFERENCES "instructions"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "projects" ADD CONSTRAINT "projects_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "templates" ADD CONSTRAINT "templates_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "templates_to_instructions" ADD CONSTRAINT "templates_to_instructions_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "templates_to_instructions" ADD CONSTRAINT "templates_to_instructions_instruction_id_instructions_id_fk" FOREIGN KEY ("instruction_id") REFERENCES "instructions"("id") ON DELETE cascade ON UPDATE no action;

-- Indexes
CREATE INDEX IF NOT EXISTS "embedding_index" ON "embedded_files" USING hnsw ("embedding" vector_cosine_ops);
