ALTER TABLE "workspaces" ADD COLUMN "github_organization_id" text;
ALTER TABLE "workspaces" ADD COLUMN "github_organization_name" text;
ALTER TABLE "projects" ADD COLUMN "github_repo_id" INTEGER;
