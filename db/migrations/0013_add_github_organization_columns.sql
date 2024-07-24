ALTER TABLE "workspaces" ADD COLUMN "github_organization_id" text;
ALTER TABLE "workspaces" ADD COLUMN "github_organization_name" text;
ALTER TABLE "projects" ADD COLUMN "repository_id" VARCHAR(255);