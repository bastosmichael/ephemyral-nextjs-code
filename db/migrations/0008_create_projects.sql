CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"workspace_id" uuid NOT NULL,
	"name" text NOT NULL,
	"github_repo_full_name" text,
	"github_target_branch" text,
	"github_installation_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
