CREATE TABLE IF NOT EXISTS "embedded_branches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"project_id" uuid NOT NULL,
	"github_repo_full_name" text NOT NULL,
	"branch_name" text NOT NULL,
	"last_embedded_commit_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
